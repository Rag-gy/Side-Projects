const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express()
const server = require('http').createServer(app)    // return a new instance of server
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname+'/public')))
app.use(cors())

const users = {}

io.on('connection', (socket)=>{
    socket.emit('chat-message', {message:'Welcome to the chat', name:"Server"})

    socket.on('new-user', name=>{
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })

    socket.on('send-message', message=>{
        socket.broadcast.emit('chat-message', {message:message, name:users[socket.id]})
    })

    socket.on('disconnect', ()=>{
        socket.broadcast.emit(`user-disconnected`, users[socket.id])
        delete users[socket.id]
    })
})

// console.log(__dirname)   this gives the current directory name

server.listen(3000)
