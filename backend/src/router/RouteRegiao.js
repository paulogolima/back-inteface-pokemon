import express from 'express'
import * as ControllersRegiao from '../controllers/ControllersRegiao.js'

const router = express.Router()

router.get('/', ControllersRegiao.listar)
router.get('/:id', ControllersRegiao.obter)
router.post('/', ControllersRegiao.criar)
router.put('/:id', ControllersRegiao.atualizar)
router.delete('/:id', ControllersRegiao.deletar)

export default router
