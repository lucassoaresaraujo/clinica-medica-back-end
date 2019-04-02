module.exports = (sequelize, DataType) => {
    const Endereco = sequelize.define("endereco", {
        id: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        logradouro: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "O logradouro deve ser preenchido"
                }
            }
        },
        bairro: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "O bairro deve ser preenchido"
                }
            }
        },
        numero: {
            type: DataType.STRING(15),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "O número do endereco deve ser preenchido"
                }            
            }
        },
        complemento: {
            type: DataType.STRING,
            allowNull: true,
        },
        referencia: { 
            type: DataType.STRING,
        },
        cep: {
            type: DataType.STRING(8),
            validate: {
                len: {
                    args: [8,8],
                    msg: "Insira um CEP válido"
                }
            }
        }, 
        enderecable: DataType.STRING,
        enderecableId: DataType.INTEGER
    });

    Endereco.associate = (models) => {        
        Endereco.belongsTo(models.paciente, {foreignKey: 'enderecableId', constraints: false, as: "paciente"});
        Endereco.belongsTo(models.cidade);
    }

    Endereco.prototype.getItem = function(options) {
        return this[
          'get' +
            this.get('enderecable')
              [0]
              .toUpperCase() +
            this.get('enderecable').substr(1)
        ](options);
    };

    return Endereco;
};