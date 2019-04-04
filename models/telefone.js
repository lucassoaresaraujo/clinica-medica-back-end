module.exports = (sequelize, DataType) => {
    const Telefone = sequelize.define("telefone", {
        id: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        numero: {
            type: DataType.STRING(11),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "O número do telefone deve ser preenchido"
                },
                len: {
                    args: [8, 11],
                    msg: "Insira um telefone válido"
                }
            }
        },
        telefonable: DataType.STRING,
        telefonableId: DataType.INTEGER
    });

    Telefone.associate = (models) => {
        Telefone.belongsTo(models.enum, {as: "tipo"});
        //Telefone.belongsTo(models.fornecedor, {foreignKey: 'telefonableId', constraints: false, as: "fornecedor"});
    }

    Telefone.prototype.getItem = function(options) {
        return this[
          'get' +
            this.get('telefonable')
              [0]
              .toUpperCase() +
            this.get('telefonable').substr(1)
        ](options);
    };

    return Telefone;
};