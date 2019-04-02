module.exports = (sequelize, DataType) => {
    const Enum = sequelize.define("enum", {
        id: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true                
            }
        },
        description: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                len: [3,255]
            }
        },
        secondaryId: {
            type: DataType.STRING,
            allowNull: true            
        },
        type: {
            type: DataType.STRING,
            allowNull: false
        }
    });

    Enum.associate = (models) => { }

    return Enum;
};