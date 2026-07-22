import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class Treinador extends Model {
    static associate(models) {
      this.belongsTo(models.Regiao, { foreignKey: 'id_regiao', as: 'regiao' })
      this.hasMany(models.Grupo, { foreignKey: 'id_treinador', as: 'grupos' })
    }
  }

  Treinador.init(
    {
      id_treinador: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome_treinador: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      idade: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: { min: 10 },
      },
      cidade_origem: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      id_regiao: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      especialidade: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Treinador',
      schema: 'pokemon_teste',
      tableName: 'treinador',
      timestamps: false,
    }
  )

  return Treinador
}
