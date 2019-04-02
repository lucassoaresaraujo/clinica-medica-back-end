module.exports = app => {
    app.db.sequelize.sync().done(() => {
        app.listen(app.get("port"), ()=> {
            console.log(`Funcionando na porta ${app.get("port")}`);
        });
    });
}