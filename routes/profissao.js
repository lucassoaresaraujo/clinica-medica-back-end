module.exports = app => {    
    const Profissao = app.db.models.profissao;
    const Op = app.db.Sequelize.Op;

    app.route("/profissao")
        .get((req, res) => {
            Profissao.findAll({where: {
                nome: {
                    [Op.iLike]: `%${req.query.nome}%`
                }
            }})
                .then(enuns => {
                    res.json({lista: enuns});
                })
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        });  

}