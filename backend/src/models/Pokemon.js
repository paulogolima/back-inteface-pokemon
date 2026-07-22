import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class Pokemon extends Model {
    static associate(models) {
      // Relacionamentos com grupo (6 slots de pokemon)
      this.hasMany(models.Grupo, { foreignKey: 'id_pokemon_1', as: 'grupo_slot_1' })
      this.hasMany(models.Grupo, { foreignKey: 'id_pokemon_2', as: 'grupo_slot_2' })
      this.hasMany(models.Grupo, { foreignKey: 'id_pokemon_3', as: 'grupo_slot_3' })
      this.hasMany(models.Grupo, { foreignKey: 'id_pokemon_4', as: 'grupo_slot_4' })
      this.hasMany(models.Grupo, { foreignKey: 'id_pokemon_5', as: 'grupo_slot_5' })
      this.hasMany(models.Grupo, { foreignKey: 'id_pokemon_6', as: 'grupo_slot_6' })
    }
  }

  Pokemon.init({
    id_pokemon: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome_pokemon: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    tipo_1: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tipo_2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 0 }
    },
    ataque: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 0 }
    },
    defesa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 0 }
    },
    ataque_especial: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 0 }
    },
    defesa_especial: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 0 }
    },
    velocidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 0 }
    },
  }, {
    sequelize,
    modelName: 'Pokemon',
    schema: 'pokemon_teste',
    tableName: 'pokemon',
    timestamps: false
  })

  return Pokemon
}