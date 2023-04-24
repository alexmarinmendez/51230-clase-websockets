// const express = require('express')
import express from 'express'
// const { Server } = require('socket.io')
import { Server } from 'socket.io'

const app = express()

app.use(express.static('public'))

const httpServer = app.listen(8080, () => console.log('Server Up'))

const socketServer = new Server(httpServer) //"apreton de manos" => handshake

let log = []

socketServer.on('connection', (socketClient) => {
    console.log(`Cliente socket ${socketClient.id} conectado...`)
    socketClient.on('message', data => {
        log.push({userId: socketClient.id, message: data})
        // socketClient.emit('history', log)
        socketServer.emit('history', log)
    })
})