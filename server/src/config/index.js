global.__DEV__ = true
// __STAGE__
global.__PROD__ = false

export default {
  name: 'Sort of Social Network',
  port: 3002,
  db: {
    url: 'mongodb://siradenis:wwwwww123123@ds227045.mlab.com:27045/test2'
  },
  jwt: {
    secret: 'HIDDEN_SECRET'
  }
}