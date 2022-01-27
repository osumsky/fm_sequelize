'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
        Group.belongsToMany(models.User, {
          through: 'users_to_groups',
          foreignKey: 'groupId',
        });
    }
  }
  Group.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      imagePath: { field: 'image_path', type: DataTypes.STRING },
      description: { type: DataTypes.STRING },
    },
    {
      sequelize,
      tableName: 'groups',
      modelName: 'Group',
      underscored: true,
    }
  );
  return Group;
};
