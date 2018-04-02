import opn from 'opn'
import config from './config'
import App from './App'

const app = new App({ config })
app.run()

const port = config.port
//opn(`http://localhost:${port}`)
