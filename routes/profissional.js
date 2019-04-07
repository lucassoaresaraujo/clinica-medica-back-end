module.exports = app => {
    const sequelize = app.db.sequelize;
    const Profissional = app.db.models.profissional;
    const Telefone = app.db.models.telefone;
    const Endereco = app.db.models.endereco;
    const Cidade = app.db.models.cidade;

    app.route("/profissional")
        .get(async (req, res) => {
            try {                
                const {docs, pages, total} = await Profissional.paginate({
                    page: req.query.page || 1,
                    paginate: req.query.paginate || 10,
                    order: [[req.query.orderBy || 'nome', req.query.order || 'ASC']],
                });
                res.json({profissionais: docs, pages: pages, total: total});
            } catch (error) {
                res.status(412).json({msg: error.message});
            }
        })
        .post(async (req, res)=> {
            let transaction;
            try {                
                transaction = await sequelize.transaction();
                const profissional = await Profissional.create(req.body, {
                    include: [Telefone, Endereco],
                    transaction: transaction 
                });
                await transaction.commit();
                res.status(201).json(profissional);
            } catch (error) {
                await transaction.rollback();
                res.status(412).json({errors: error.errors});
            }
        });

    app.route("/profissional/:id")
        .get(async (req, res) => {
            try {                
                const profissional = await Profissional.findOne({where: req.params, include: [Telefone, {
                    association: Profissional.associations.enderecos,
                    include: [{association: Endereco.associations.cidade, include: Cidade.associations.estado}]
                }]});
                res.json({profissional: profissional})
            } catch (error) {
                res.status(412).json({msg: error.message});
            }
        })
        .put(async (req, res) => {            
            const profissional = await Profissional.findByPk(req.params.id);
            let transaction;
            try {    
                transaction = await sequelize.transaction();
                await profissional.update(req.body, {transaction: transaction});
                await Endereco.destroy({force: true, where: {enderecable: 'profissional', enderecableId: profissional.id}}, {transaction: transaction});
                await Telefone.destroy({force: true, where: {telefonable: 'profissional', telefonableId: profissional.id}}, {transaction: transaction});                
                const promisesEndereco = req.body.enderecos.map(endereco => {
                    return Endereco.create(endereco, {transaction: transaction});
                });
                const promisesTelefone = req.body.telefones.map(telefone => {
                    return Telefone.create(telefone, {transaction: transaction})
                });                
                const enderecos = await Promise.all(promisesEndereco);
                const telefones = await Promise.all(promisesTelefone);
                await profissional.setEnderecos(enderecos, {transaction: transaction});
                await profissional.setTelefones(telefones, {transaction: transaction});                
                await transaction.commit();            
                res.sendStatus(204);
            } catch (error) {                
                await transaction.rollback();
                res.status(412).json({msg: error.message});
            }
        })
        .delete(async (req, res) => {
            try {
                await Profissional.destroy({where: req.params});
                res.sendStatus(204);
            } catch (error) {
                res.status(412).json({msg: error.message});
            }
        });
}