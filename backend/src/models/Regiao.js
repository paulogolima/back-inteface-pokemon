import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class Regiao extends Model {
    static associate(models) {
      this.hasMany(models.Treinador, { foreignKey: 'id_regiao', as: 'treinadores' })
    }
  }

  Regiao.init(
    {
      id_regiao: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome_regiao: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'Regiao',
      schema: 'pokemon_teste',
      tableName: 'regiao',
      timestamps: false,
    }
  )

  return Regiao
}
