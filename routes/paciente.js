  
module.exports = app => {
    const sequelize = app.db.sequelize;
    const Paciente = app.db.models.paciente;
    const Telefone = app.db.models.telefone;
    const Endereco = app.db.models.endereco;
    const Cidade = app.db.models.cidade;

    app.route("/paciente")
        .get(async (req, res) => {
            try {                
                const pacientes = await Paciente.findAll({include: [Endereco, Telefone]});
                res.json({pacientes: pacientes})
            } catch (error) {
                res.status(412).json({msg: error.message});
            }
        })
        .post(async (req, res)=> {
            try {
                //console.log(req.body);
                const paciente = await Paciente.create(req.body, {
                    include: [Telefone, {
                        association: Paciente.associations.enderecos,
                        include: [Endereco.associations.cidade]
                    }], 
                });
                res.status(201).json(paciente);
            } catch (error) {
                res.status(412).json({msg: error.message});
            }
        });

    app.route("/paciente/:id")
        .put(async (req, res) => {
            let transaction;
            try {
                const paciente = await Paciente.findByPk(req.params.id);        
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
                console.log(error);
                await transaction.rollback();
                res.status(412).json({msg: error.message});
            }
        })
}