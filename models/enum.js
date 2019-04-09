module.exports = (sequelize, DataType) => {
    const Enum = sequelize.define("enum", {
        id: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true                
            }
        },
        descricao: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                len: [3,255]
            }
        },
        codigoSecundario: {
            type: DataType.STRING,
            allowNull: true            
        },
        tipo: {
            type: DataType.STRING,
            allowNull: false
        }
    });

    Enum.associate = (models) => { }

    return Enum;
};