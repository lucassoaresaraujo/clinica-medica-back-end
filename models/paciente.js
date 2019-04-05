const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataType) => {
    const Paciente = sequelize.define("paciente", {
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
                    msg: "Insira um nome válido"
                },
                len: {
                    args: [2, 255],
                    msg: "O nome deve ter entre 2 e 255 caracteres"
                }
            }
        },
        cpf: {
            type: DataType.STRING,
            allowNull: true,
            defaultValue: null,
            unique: true,
            validate: {
                notEmpty: {
                    msg: "Insira um CPF válido"
                },
                len: {
                    args: [11, 11],
                    msg: "Insira um CPF válido"
                }
            }
        },
        documentoIdentidade: {
            type: DataType.STRING,
            allowNull: true,
            defaultValue: null,
            unique: true,
            validate: {
                notEmpty: {
                    msg: "Insira um documento válido"
                }                
            }
        },
        email: {
            type: DataType.STRING,
            allowNull: true,
            unique: true,
            validate: {
                isEmail: {
                    msg: "Insira um email válido"
                }
            }
        },
        naturalidade: {
            type: DataType.STRING,
            allowNull: true,
            defaultValue: null,
            validate: {
                notEmpty: {
                    msg: "Insira uma naturalidade válida"
                }                
            }
        },
        nacionalidade: {
            type: DataType.STRING,
            allowNull: true,
            defaultValue: null,
            validate: {
                notEmpty: {
                    msg: "Insira uma nacionalidade válida"
                }                
            }
        },        
        nomePai: {
            type: DataType.STRING,
            allowNull: true,
            defaultValue: null,
            validate: {
                notEmpty: {
                    msg: "Insira o nome do pai corretamente"
                },
                len: {
                    args: [4, 255],
                    msg: "Insira o nome do pai corretamente"
                }
            }
        },
        nomeMae: {
            type: DataType.STRING,
            allowNull: true,
            defaultValue: null,
            validate: {
                notEmpty: {
                    msg: "Insira o nome da mãe corretamente"
                },
                len: {
                    args: [4, 255],
                    msg: "Insira o nome da mãe corretamente"
                }
            }
        },
        dataNascimento: {
            type: DataType.DATEONLY,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Insira a data de nascimento"
                }
            }         
        },
        profissao: {
            type: DataType.STRING,
            allowNull: true,
            defaultValue: null,
        },
        observacoes: {
            type: DataType.TEXT,
            allowNull: true,
            
        }
    });

    Paciente.associate = (models) => {
        Paciente.belongsTo(models.enum, {as: "Genero"});
        Paciente.belongsTo(models.enum, {as: "Escolaridade"});
        Paciente.belongsTo(models.enum, {as: "TipoSanguineo"});
        Paciente.belongsTo(models.enum, {as: "SituacaoFamiliar"});
        Paciente.hasMany(models.telefone, {foreignKey: 'telefonableId', constraints: false, scope: {telefonable: 'paciente'}});
        Paciente.hasMany(models.endereco, {foreignKey: 'enderecableId', constraints: false, scope: {enderecable: 'paciente'}});
    }

    sequelizePaginate.paginate(Paciente);
    return Paciente;
};