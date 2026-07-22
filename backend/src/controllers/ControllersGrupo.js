import db from '../models/index.js'

const { Grupo, Treinador, Pokemon } = db

const includeGrupo = [
  { model: Treinador, as: 'treinador', attributes: ['id_treinador', 'nome_treinador'] },
  { model: Pokemon, as: 'pokemon_1', attributes: ['id_pokemon', 'nome_pokemon'] },
  { model: Pokemon, as: 'pokemon_2', attributes: ['id_pokemon', 'nome_pokemon'] },
  { model: Pokemon, as: 'pokemon_3', attributes: ['id_pokemon', 'nome_pokemon'] },
  { model: Pokemon, as: 'pokemon_4', attributes: ['id_pokemon', 'nome_pokemon'] },
  { model: Pokemon, as: 'pokemon_5', attributes: ['id_pokemon', 'nome_pokemon'] },
  { model: Pokemon, as: 'pokemon_6', attributes: ['id_pokemon', 'nome_pokemon'] },
]

const camposObrigatorios = [
  'nome_grupo',
  'id_treinador',
  'id_pokemon_1',
  'id_pokemon_2',
  'id_pokemon_3',
  'id_pokemon_4',
  'id_pokemon_5',
  'id_pokemon_6',
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

    const grupo = await Grupo.create(req.body)
    return res.status(201).json(grupo)
  } catch (erro) {
    return res.status(500).json({ erro: erro.message || 'Erro ao criar grupo' })
  }
}

export const listar = async (_req, res) => {
  try {
    const grupos = await Grupo.findAll({
      include: includeGrupo,
      order: [['id_grupo', 'ASC']],
    })
    return res.json(grupos)
  } catch (erro) {
    return res.status(500).json({ erro: erro.message || 'Erro ao listar grupos' })
  }
}

export const obter = async (req, res) => {
  try {
    const grupo = await Grupo.findByPk(req.params.id, { include: includeGrupo })
    if (!grupo) {
      return res.status(404).json({ erro: 'Grupo nao encontrado' })
    }
    return res.json(grupo)
  } catch (erro) {
    return res.status(500).json({ erro: erro.message || 'Erro ao obter grupo' })
  }
}

export const atualizar = async (req, res) => {
  try {
    const grupo = await Grupo.findByPk(req.params.id)
    if (!grupo) {
      return res.status(404).json({ erro: 'Grupo nao encontrado' })
    }

    await grupo.update(req.body)
    return res.json(grupo)
  } catch (erro) {
    return res.status(500).json({ erro: erro.message || 'Erro ao atualizar grupo' })
  }
}

export const deletar = async (req, res) => {
  try {
    const grupo = await Grupo.findByPk(req.params.id)
    if (!grupo) {
      return res.status(404).json({ erro: 'Grupo nao encontrado' })
    }

    await grupo.destroy()
    return res.status(204).send()
  } catch (erro) {
    return res.status(500).json({ erro: erro.message || 'Erro ao deletar grupo' })
  }
}
