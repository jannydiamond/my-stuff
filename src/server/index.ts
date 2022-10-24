import express, { Express } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import authRouter from './routes/auth'
import inventoryListsRouter from './routes/inventoryLists'
import usersRouter from './routes/users'

const app: Express = express()

const hostname = process.env.HOST ? process.env.HOST : '0.0.0.0'
const port = process.env.PORT ? parseInt(process.env.PORT) : 8080

const apiVersion = 'v1'
const basePath = `/api/${apiVersion}`

app.use(helmet())
app.use(cors())
// parse requests of content-type - application/json
app.use(express.json())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use(`${basePath}`, authRouter)
app.use(`${basePath}/users`, usersRouter)
app.use(`${basePath}/inventory-lists`, inventoryListsRouter)

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
