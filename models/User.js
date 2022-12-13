'use strict';
const { Model } = require('sequelize');
const { isBefore } = require('date-fns');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Task);
    }
  }
  User.init(
    {
      fname: {
        field: 'first_name',
        allowNull: false,
        type: DataTypes.STRING(64),
        validate: { notNull: true, notEmpty: true },
      },
      lname: {
        field: 'last_name',
        allowNull: false,
        type: DataTypes.STRING(128),
        validate: { notNull: true, notEmpty: true },
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: { notNull: true, notEmpty: true, isEmail: true },
      },
      password: {
        field: 'password_hash',
        allowNull: false,
        type: DataTypes.TEXT,
        set(value) {
          this.setDataValue('password', 'hash_password'); // it needs to add a hash func
        },
      },
      birthday: {
        type: DataTypes.DATEONLY,
        validate: {
          isDate: true,
          isValidate(value) {
            if (isBefore(new Date(), new Date(value)))
              throw new Error('Birthday check error');
          },
        },
      },
      isMale: { field: 'is_male', allowNull: false, type: DataTypes.BOOLEAN },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      underscored: true,
    }
  );
  return User;
};
