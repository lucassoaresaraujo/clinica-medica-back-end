module.exports = (sequelize, DataType) => {
    const Estado = sequelize.define("estado", {
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
        },
        abreviacao: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "A abreviação deve ser preenchida"
                }
            }
        }
    });

    Estado.associate = (models) => {        
        Estado.hasMany(models.cidade, {foreignKey: 'estadoId'});
    }

    return Estado;
};