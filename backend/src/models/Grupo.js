import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class Grupo extends Model {
    static associate(models) {
      this.belongsTo(models.Treinador, { foreignKey: 'id_treinador', as: 'treinador' })
      this.belongsTo(models.Pokemon, { foreignKey: 'id_pokemon_1', as: 'pokemon_1' })
      this.belongsTo(models.Pokemon, { foreignKey: 'id_pokemon_2', as: 'pokemon_2' })
      this.belongsTo(models.Pokemon, { foreignKey: 'id_pokemon_3', as: 'pokemon_3' })
      this.belongsTo(models.Pokemon, { foreignKey: 'id_pokemon_4', as: 'pokemon_4' })
      this.belongsTo(models.Pokemon, { foreignKey: 'id_pokemon_5', as: 'pokemon_5' })
      this.belongsTo(models.Pokemon, { foreignKey: 'id_pokemon_6', as: 'pokemon_6' })
    }
  }

  Grupo.init(
    {
      id_grupo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome_grupo: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      id_treinador: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_pokemon_1: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_pokemon_2: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_pokemon_3: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_pokemon_4: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_pokemon_5: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_pokemon_6: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Grupo',
      schema: 'pokemon_teste',
      tableName: 'grupo',
      timestamps: false,
    }
  )

  return Grupo
}
