import bunyan from 'bunyan'
import express from 'express'
import mongoose from 'mongoose'
import http from 'http'
import socketIO from 'socket.io'
import getMiddlewares from './middlewares'
import getModels from './models'
import getResourses from './resourses'
import getApi from './api'
import useSockets from './sockets'


export default class App {
  constructor(params = {}) {
    Object.assign(this, params)
    if (!this.log) this.log = this.getLogger()
    this.init()
  }

  getLogger(params) {
    return bunyan.createLogger(Object.assign({
      name: 'app',
      src: __DEV__,
      level: 'trace'
    }, params))
  }

  getMiddlewares() {
    return getMiddlewares(this)
  }
  getModels() {
    return getModels(this)
  }
  getDatabase() {
    return {
      run: () => {
        new Promise((resolve) => {
          mongoose.connect(this.config.db.url)
          resolve()
        })
      }
    }
  }
  getResourses() {
    return getResourses(this)
  }

  init() {
    this.log.trace('App init')

    this.app = express()
    this.server = http.Server(this.app)
    this.io = socketIO(this.server)
    
    this.db = this.getDatabase()
    this.middlewares = this.getMiddlewares()
    this.log.trace('middlewares', Object.keys(this.middlewares))
    this.models = this.getModels()
    this.log.trace('models', Object.keys(this.models))
    this.resourses = this.getResourses()
    this.log.trace('resourses', Object.keys(this.resourses))

    this.useStatic()
    this.useMiddlewares()
    this.useRoutes()
    this.useDefaultRoute()
    this.useSockets()
  }

  useMiddlewares() {
    this.app.use(this.middlewares.reqLog)
    this.app.use(this.middlewares.accessLogger)
    this.app.use(this.middlewares.reqParser)
    this.app.use(this.resourses.Auth.parseToken)
    this.app.use(this.resourses.Auth.parseUser)
  }
  useRoutes() {
    const api = getApi(this)
    this.app.use('/api', api)
  }
  useDefaultRoute() {
    this.app.use((req, res, next) => {
      const err = ('Route not found')
      next(err)
    })
  }
  useStatic() {
    this.app.use(express.static(__dirname + '/../../client/build'))
  }
  useSockets() {
    useSockets(this)
  }

  async run() {
    this.log.trace('App run')
    try {
      await this.db.run()
    } catch (err) {
      this.log.fatal(err)
    }
    return new Promise((resolve) => {
      this.server.listen(this.config.port, () => {
        this.log.info(`App "${this.config.name}" running on port ${this.config.port}!`)
        resolve(this)
      })
    })
  }
}
