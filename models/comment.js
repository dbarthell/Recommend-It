'use strict';

module.exports = function (sequelize, DataTypes) {
    var Comment = sequelize.define('Comment', {
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE(3),
            // defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
            defaultValue: DataTypes.NOW(),
        }
    });

    Comment.associate = function (models) {
        Comment.belongsTo(models.Recommendation, { as: 'Recommendation', foreignKey: 'postId' })
    }

    return Comment;
};