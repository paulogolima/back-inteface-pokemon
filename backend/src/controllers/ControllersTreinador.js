import db from '../models/index.js'

const { Treinador, Regiao } = db

const includeRegiao = {
  model: Regiao,
  as: 'regiao',
  attributes: ['id_regiao', 'nome_regiao'],
}

export const criar = async (req, res) => {
  try {
    const { nome_treinador, id_regiao } = req.body
    if (!nome_treinador || !id_regiao) {
      return res.status(400).json({ erro: 'nome_treinador e id_regiao sao obrigatorios' })
    }

    const treinador = await Treinador.create(req.body)
    return res.status(201).json(treinador)
  } catch (erro) {
    return res.status(500).json({ erro: erro.message || 'Erro ao criar treinador' })
  }
}

export const listar = async (_req, res) => {
  try {
    const treinadores = await Treinador.findAll({
      include: [includeRegiao],
      order: [['id_treinador', 'ASC']],
    })
    return res.json(treinadores)
  } catch (erro) {
    return res.status(500).json({ erro: erro.message || 'Erro ao listar treinadores' })
  }
}

export const obter = async (req, res) => {
  try {
    const treinador = await Treinador.findByPk(req.params.id, { include: [includeRegiao] })
    if (!treinador) {
      return res.status(404).json({ erro: 'Treinador nao encontrado' })
    }
    return res.json(treinador)
  } catch (erro) {
    return res.status(500).json({ erro: erro.message || 'Erro ao obter treinador' })
  }
}

export const atualizar = async (req, res) => {
  try {
    const treinador = await Treinador.findByPk(req.params.id)
    if (!treinador) {
      return res.status(404).json({ erro: 'Treinador nao encontrado' })
    }

    await treinador.update(req.body)
    return res.json(treinador)
  } catch (erro) {
    return res.status(500).json({ erro: erro.message || 'Erro ao atualizar treinador' })
  }
}

export const deletar = async (req, res) => {
  try {
    const treinador = await Treinador.findByPk(req.params.id)
    if (!treinador) {
      return res.status(404).json({ erro: 'Treinador nao encontrado' })
    }

    await treinador.destroy()
    return res.status(204).send()
  } catch (erro) {
    return res.status(500).json({ erro: erro.message || 'Erro ao deletar treinador' })
  }
}
