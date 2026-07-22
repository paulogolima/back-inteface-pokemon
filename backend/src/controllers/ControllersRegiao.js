import db from '../models/index.js'

const { Regiao } = db

export const criar = async (req, res) => {
  try {
    const { nome_regiao } = req.body
    if (!nome_regiao) {
      return res.status(400).json({ erro: 'nome_regiao e obrigatorio' })
    }

    const regiao = await Regiao.create({ nome_regiao })
    return res.status(201).json(regiao)
  } catch (erro) {
    if (erro.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ erro: 'Ja existe regiao com esse nome' })
    }
    return res.status(500).json({ erro: erro.message || 'Erro ao criar regiao' })
  }
}

export const listar = async (_req, res) => {
  try {
    const regioes = await Regiao.findAll({ order: [['id_regiao', 'ASC']] })
    return res.json(regioes)
  } catch (erro) {
    return res.status(500).json({ erro: erro.message || 'Erro ao listar regioes' })
  }
}

export const obter = async (req, res) => {
  try {
    const regiao = await Regiao.findByPk(req.params.id)
    if (!regiao) {
      return res.status(404).json({ erro: 'Regiao nao encontrada' })
    }
    return res.json(regiao)
  } catch (erro) {
    return res.status(500).json({ erro: erro.message || 'Erro ao obter regiao' })
  }
}

export const atualizar = async (req, res) => {
  try {
    const regiao = await Regiao.findByPk(req.params.id)
    if (!regiao) {
      return res.status(404).json({ erro: 'Regiao nao encontrada' })
    }

    await regiao.update(req.body)
    return res.json(regiao)
  } catch (erro) {
    if (erro.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ erro: 'Ja existe regiao com esse nome' })
    }
    return res.status(500).json({ erro: erro.message || 'Erro ao atualizar regiao' })
  }
}

export const deletar = async (req, res) => {
  try {
    const regiao = await Regiao.findByPk(req.params.id)
    if (!regiao) {
      return res.status(404).json({ erro: 'Regiao nao encontrada' })
    }

    await regiao.destroy()
    return res.status(204).send()
  } catch (erro) {
    return res.status(500).json({ erro: erro.message || 'Erro ao deletar regiao' })
  }
}
