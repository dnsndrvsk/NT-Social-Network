const connections = []

export default (ctx) => {
  const { User } = ctx.models
  
  ctx.io.on('connection', async (socket) => {
    connections.push(socket)

    socket.on('disconnect', async () => {
      const { userID } = socket
      try {
        const user = await User.findOneAndUpdate({_id: userID}, {$set: {'online.currently': false, 'online.lastOnline': new Date}})
        ctx.io.emit('userIsGone', { user })
      } catch(err) {
        console.log(err)
      }
    })
    
    socket.on('checkAuth', async (data) => {
      const { userID } = data
      try {
        const user = await User.findOneAndUpdate({ _id: userID }, {
          $set: { 'online.currently': true }
        })
        socket.userID = user._id
        ctx.io.emit('userIsBack', { user })
      } catch(err) {
        throw err
      }
    })
  })
}
