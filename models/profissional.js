const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataType) => {
    const Profissional = sequelize.define("profissional", {
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
                notNull: {
                    msg: "O nome deve ser informado"
                },
                len: {
                    args: [2, 255],
                    msg: "O nome deve ter entre 2 e 255 caracteres"
                }
            }
        },
        nomeAbreviado: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Insira um nome abreviado válido"
                },
                notNull: {
                    msg: "O nome abreviado deve ser informado"
                },
                len: {
                    args: [2, 35],
                    msg: "O nome abreviado deve ter entre 2 e 35 caracteres"
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
            type: DataType.STRING(25),
            allowNull: true,
            defaultValue: null,
            unique: true,
            validate: {
                notEmpty: {
                    msg: "Insira um documento de identidade válido"
                }
            }
        },
        orgaoEmissor: {
            type: DataType.STRING(25),
            allowNull: true,
            defaultValue: null,
            validate: {
                notEmpty: {
                    msg: "Insira um orgão emissor válido"
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
        registroConselho: {
            type: DataType.STRING(15),
            allowNull: true,
            defaultValue: null,            
            validate: {
                notEmpty: {
                    msg: "Insira um documento de identidade válido"
                }
            }
        },
        possuiAgenda: {
            type: DataType.BOOLEAN
        },
        observacoes: {
            type: DataType.TEXT,
            allowNull: true,
        }
    });

    Profissional.associate = (models) => {
        Profissional.belongsTo(models.enum, {as: "Genero"});
        Profissional.belongsTo(models.enum, {as: "Conselho"});
        Profissional.belongsTo(models.enum, {as: "TipoSanguineo"});
        Profissional.belongsTo(models.profissao);
        Profissional.hasMany(models.telefone, {foreignKey: 'telefonableId', constraints: false, scope: {telefonable: 'profissional'}});
        Profissional.hasMany(models.endereco, {foreignKey: 'enderecableId', constraints: false, scope: {enderecable: 'profissional'}});
    }

    sequelizePaginate.paginate(Profissional);
    return Profissional;
};