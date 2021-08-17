const {Sequelize, Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    toJSON(){
      return {...this.get(), id: undefined}
    }
  };
  User.init({
    uuid: {
        type: DataTypes.UUID,
        unique: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
    },
    username: {
      type: DataTypes.STRING,   
      unique: true,
      allowNull: false,
      validate:{
        notNull: true,
        len: [5,20]
      }  
    },
    passwort: {
      type: DataTypes.STRING
    },
    roll:{
      type: DataTypes.ENUM,
      values: ['admin', 'member'],
      defaultValue: "member"
    },
    createdAt:{
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
    updatedAt:{
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
    deletedAt:{
      type: DataTypes.DATE,
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false
  });
  return User;
};