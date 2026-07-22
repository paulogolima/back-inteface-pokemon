import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'
import PokemonModel from './Pokemon.js'
import RegiaoModel from './Regiao.js'
import TreinadorModel from './Treinador.js'
import GrupoModel from './Grupo.js'

const Pokemon = PokemonModel(sequelize, DataTypes)
const Regiao = RegiaoModel(sequelize, DataTypes)
const Treinador = TreinadorModel(sequelize, DataTypes)
const Grupo = GrupoModel(sequelize, DataTypes)

const db = {
  sequelize,
  Regiao,
  Treinador,
  Grupo,
  Pokemon,
}

Object.values(db).forEach((model) => {
  if (model?.associate) {
    model.associate(db)
  }
})

export default db
