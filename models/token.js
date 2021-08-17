const {Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Token.init({
    token:{
      type: DataTypes.STRING,   
      unique: true,
      allowNull: false,
    },
    createdAt:{
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Token',
    timestamps: false
  });
  return Token;
};