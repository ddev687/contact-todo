import 'dotenv/config'
import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import express from 'express'
import { engine } from 'express-handlebars';
import * as httpContext from 'express-http-context'
import http from 'http'
import config from './config'
import routes from './routes'
import './config/db';
require('dotenv').config()

const app = express()
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.use(cors({ origin: '*', optionsSuccessStatus: 200 }))
app.options('*', cors())
app.use(bodyParser.raw({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(httpContext.middleware)
let httpServer = http.createServer(app);

function replaceErrors(errkey: any, errValue: any) {
  if (errValue instanceof Error) {
    const val: { [key: string]: any } = {}
    Object.getOwnPropertyNames(errValue).forEach((key: string) => {
      val[key] = errValue[key]
    })
    return val
  }
  return errValue
}

function gracefulShutdown() {
  setTimeout(() => {
    process.exit(1)
  }, 1)
}

process.on('exit', async () => {
  try {
    console.log('on-exit: cleaning connections')
  } catch (err: any) {
    console.error(err.stack)
  }
})

process.on('unhandledRejection', (reason, p) => {
  console.error('unhandledRejectionError ' + JSON.stringify(reason, replaceErrors))
  gracefulShutdown()
})

process.on('uncaughtException', (err) => {
  console.error('uncaughtExceptionError ' + JSON.stringify(err, replaceErrors))
  gracefulShutdown()
})

app.get('/', (req: express.Request, res: express.Response) => res.send('API Server is Up!!'))

app.use('/contact-todo', routes)

app.use(compression())

const port = config.port || '5001'
httpServer.listen(port, () => {
  console.log(`server is listening on ${port}`)
})

export default app
