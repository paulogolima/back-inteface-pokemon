import 'dotenv/config'
import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import db from './models/index.js'
import pokemonRouter from './router/RoutePokemon.js'
import regiaoRouter from './router/RouteRegiao.js'
import treinadorRouter from './router/RouteTreinador.js'
import grupoRouter from './router/RouteGrupo.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const frontendDir = path.resolve(__dirname, '../../frontend/frontend')

const app = express()
const PORT = process.env.PORT || 3000
const DB_SYNC = process.env.DB_SYNC !== 'false'
const DB_SCHEMA = process.env.DB_SCHEMA || 'pokemon_teste'

app.use(express.json({ }))
app.use(express.static(frontendDir))

app.use('/api/pokemons', pokemonRouter)
app.use('/api/regioes', regiaoRouter)
app.use('/api/treinadores', treinadorRouter)
app.use('/api/grupos', grupoRouter)

app.get('/api', (_req, res) => {
  res.json({
    mensagem: 'API Pokemon online',
    rotas: ['/api/pokemons', '/api/regioes', '/api/treinadores', '/api/grupos'],
    frontend: '/',
  })
})

app.get('/', (_req, res) => {
  res.sendFile(path.join(frontendDir, 'index.html'))
})

app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' })
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).json({ erro: err.message || 'Erro interno' })
})

async function startServer() {
  try {
    await db.sequelize.authenticate()
    console.log('Conectado ao banco de dados')

    if (DB_SYNC) {
      await db.sequelize.createSchema(DB_SCHEMA, { ifNotExists: true })
      await db.sequelize.sync()
      console.log(`Schema ${DB_SCHEMA} sincronizado com os models`)
    }

    app.listen(PORT, () => {
      console.log(`Servidor rodando em: http://localhost:${PORT}`)
    })
  } catch (erro) {
    console.error('Erro ao iniciar servidor:', erro)
    process.exit(1)
  }
}

startServer()