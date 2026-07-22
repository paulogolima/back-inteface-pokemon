import express from 'express'
import * as ControllersGrupo from '../controllers/ControllersGrupo.js'

const router = express.Router()

router.get('/', ControllersGrupo.listar)
router.get('/:id', ControllersGrupo.obter)
router.post('/', ControllersGrupo.criar)
router.put('/:id', ControllersGrupo.atualizar)
router.delete('/:id', ControllersGrupo.deletar)

export default router
