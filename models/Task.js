'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User, {
        foreignKey: 'userId',
        // must be specified, because by default it will be UserId (started with capital letter)
      });
    }
  }
  Task.init(
    {
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: { notNull: true, notEmpty: true },
      },
      isDone: {
        field: 'is_done',
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      deadLine: {
        field: 'dead_line',
        type: DataTypes.DATEONLY,
        validate: { isDate: true },
      },
    },
    {
      sequelize,
      modelName: 'Task',
      tableName: 'tasks',
      underscored: true,
    }
  );
  return Task;
};
