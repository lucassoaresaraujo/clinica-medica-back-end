module.exports = app => {
    const sequelize = app.db.sequelize;
    const Op = app.db.Sequelize.Op;
    const Paciente = app.db.models.paciente;
    const Telefone = app.db.models.telefone;
    const Endereco = app.db.models.endereco;
    const Cidade = app.db.models.cidade;

    app.route("/paciente")
        .get(async (req, res) => {
            try {                
                const filtro = req.query.filtro || '';
                const {docs, pages, total} = await Paciente.paginate({
                    page: req.query.page || 1,
                    paginate: req.query.paginate || 10,
                    order: [
                        [req.query.orderBy || 'nome', req.query.order || 'ASC']
                    ],
                    where: {
                        [Op.or]: [
                            {nome: {[Op.iLike]: `${filtro}%`}},
                            {cpf: {[Op.eq]: filtro}}
                        ]
                    }
                });
                res.json({pacientes: docs, pages: pages, total: total});
            } catch (error) {
                res.status(412).json({msg: error.message});
            }
        })
        .post(async (req, res)=> {
            let transaction;
            try {                
                transaction = await sequelize.transaction();
                const paciente = await Paciente.create(req.body, {
                    include: [Telefone, Endereco],
                    transaction: transaction 
                });
                await transaction.commit();
                res.status(201).json(paciente);
            } catch (error) {
                await transaction.rollback();
                res.status(412).json({errors: error.errors});
            }
        });

    app.route("/paciente/:id")
        .get(async (req, res) => {
            try {                
                const paciente = await Paciente.findOne({where: req.params, include: [Telefone, {
                    association: Paciente.associations.enderecos,
                    include: [{association: Endereco.associations.cidade, include: Cidade.associations.estado}]
                }]});
                res.json({paciente: paciente})
            } catch (error) {
                res.status(412).json({msg: error.message});
            }
        })
        .put(async (req, res) => {            
            const paciente = await Paciente.findByPk(req.params.id);
            let transaction;
            try {    
                transaction = await sequelize.transaction();
                await paciente.update(req.body, {transaction: transaction});// verificar transação                
                await Endereco.destroy({force: true, where: {enderecable: 'paciente', enderecableId: paciente.id}}, {transaction: transaction});
                await Telefone.destroy({force: true, where: {telefonable: 'paciente', telefonableId: paciente.id}}, {transaction: transaction});                
                const promisesEndereco = req.body.enderecos.map(endereco => {
                    return Endereco.create(endereco, {transaction: transaction});
                });
                const promisesTelefone = req.body.telefones.map(telefone => {
                    return Telefone.create(telefone, {transaction: transaction})
                });                
                const enderecos = await Promise.all(promisesEndereco);
                const telefones = await Promise.all(promisesTelefone);
                await paciente.setEnderecos(enderecos, {transaction: transaction});
                await paciente.setTelefones(telefones, {transaction: transaction});                
                await transaction.commit();            
                res.sendStatus(204);
            } catch (error) {                
                await transaction.rollback();
                res.status(412).json({msg: error.message});
            }
        })
        .delete(async (req, res) => {
            try {
                await Paciente.destroy({where: req.params});
                res.sendStatus(204);
            } catch (error) {
                res.status(412).json({msg: error.message});
            }
        });
}