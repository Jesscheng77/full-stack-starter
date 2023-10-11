import { Model, Op } from 'sequelize';

export default function (sequelize, DataTypes) {
  class Boba extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Boba.init(
    {
      Restaurants: DataTypes.STRING,
      Address: DataTypes.STRING,
      Number: DataTypes.STRING,
      Rating: DataTypes.INTEGER,
      Hours: DataTypes.STRING,
      Image: DataTypes.STRING,
      Feedback: DataTypes.TEXT,
      City: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Boba',
    }
  );
  return Boba;
}
