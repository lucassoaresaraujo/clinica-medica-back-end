module.exports = (sequelize, DataType) => {
    const Profissao = sequelize.define("profissao", {
        id: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataType.STRING(150),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Insira o nome da profissão"
                },
                len: {
                    msg: "O nome deve ter entre 2 e 150 caracteres",
                    args: [2, 150]
                }
            }
        },
        cbo: {
            type: DataType.STRING(7),
            allowNull: true,
            validate: {
                len: [5,7]
            }
        },
        saude: {
            type: DataType.BOOLEAN,                  
        }
    });

    Profissao.associate = (models) => { }

    return Profissao;
};