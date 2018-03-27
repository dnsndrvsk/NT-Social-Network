export default function () {
  return {
    User: require('./User').default(...arguments),
    Verification: require('./Verification').default(...arguments)
  }
}
