import express from 'express'
import * as ControllersTreinador from '../controllers/ControllersTreinador.js'

const router = express.Router()

router.get('/', ControllersTreinador.listar)
router.get('/:id', ControllersTreinador.obter)
router.post('/', ControllersTreinador.criar)
router.put('/:id', ControllersTreinador.atualizar)
router.delete('/:id', ControllersTreinador.deletar)

export default router
