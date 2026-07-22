import db from '../models/index.js'

const { Pokemon } = db

const camposObrigatorios = [
  'nome_pokemon',
  'tipo_1',
  'hp',
  'ataque',
  'defesa',
  'ataque_especial',
  'defesa_especial',
  'velocidade',
]

function validarCamposObrigatorios(payload) {
  return camposObrigatorios.filter((campo) => payload[campo] === undefined || payload[campo] === null)
}

export const criar = async (req, res) => {
  try {
    const faltando = validarCamposObrigatorios(req.body)
    if (faltando.length) {
      return res.status(400).json({ erro: `Campos obrigatorios: ${faltando.join(', ')}` })
    }

    const pokemon = await Pokemon.create(req.body)
    return res.status(201).json(pokemon)
  } catch (erro) {
    console.error('Erro ao criar pokemon:', erro)
    if (erro.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ erro: 'Ja existe um pokemon com esse nome' })
    }
    return res.status(500).json({ erro: erro.message || 'Erro ao criar pokemon' })
  }
}

export const listar = async (req, res) => {
  try {
    const pokemons = await Pokemon.findAll({ order: [['id_pokemon', 'ASC']] })
    return res.json(pokemons)
  } catch (erro) {
    console.error('Erro ao listar pokemons:', erro)
    return res.status(500).json({ erro: erro.message || 'Erro ao listar pokemons' })
  }
}

export const obter = async (req, res) => {
  try {
    const { id } = req.params
    const pokemon = await Pokemon.findByPk(id)

    if (!pokemon) {
      return res.status(404).json({ erro: 'Pokemon nao encontrado' })
    }

    return res.json(pokemon)
  } catch (erro) {
    console.error('Erro ao obter pokemon:', erro)
    return res.status(500).json({ erro: erro.message || 'Erro ao obter pokemon' })
  }
}

export const atualizar = async (req, res) => {
  try {
    const { id } = req.params
    const pokemon = await Pokemon.findByPk(id)

    if (!pokemon) {
      return res.status(404).json({ erro: 'Pokemon nao encontrado' })
    }

    await pokemon.update(req.body)
    return res.json(pokemon)
  } catch (erro) {
    console.error('Erro ao atualizar pokemon:', erro)
    if (erro.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ erro: 'Ja existe um pokemon com esse nome' })
    }
    return res.status(500).json({ erro: erro.message || 'Erro ao atualizar pokemon' })
  }
}

export const deletar = async (req, res) => {
  try {
    const { id } = req.params
    const pokemon = await Pokemon.findByPk(id)

    if (!pokemon) {
      return res.status(404).json({ erro: 'Pokemon nao encontrado' })
    }

    await pokemon.destroy()
    return res.status(204).send()
  } catch (erro) {
    console.error('Erro ao deletar pokemon:', erro)
    return res.status(500).json({ erro: erro.message || 'Erro ao deletar pokemon' })
  }
}