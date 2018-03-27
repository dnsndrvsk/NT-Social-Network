export default function () {
  return {
    Sockets: require('./Sockets').default(...arguments)
  }
}
