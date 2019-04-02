module.exports = (sequelize, DataType) => {
    const Cidade = sequelize.define("cidade", {
        id: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "O nome deve ser preenchido"
                }
            }
        }        
    });

    Cidade.associate = (models) => {        
        Cidade.belongsTo(models.estado, {foreignKey: 'estadoId'});
    }

    return Cidade;
};