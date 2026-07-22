import express from 'express'
import * as ControllersPokemon from '../controllers/ControllersPokemon.js'


const router = express.Router()

router.get('/', ControllersPokemon.listar)
router.get('/:id', ControllersPokemon.obter)
router.post('/', ControllersPokemon.criar)
router.put('/:id', ControllersPokemon.atualizar)
router.delete('/:id', ControllersPokemon.deletar)

export default router