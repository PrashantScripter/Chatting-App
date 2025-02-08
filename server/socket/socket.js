const { Server } = require('socket.io');
const { createServer } = require('http');
const express = require('express');

const app = express();

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['https://chatting-92yj5cqfl-prashantscripters-projects.vercel.app'],
        methods: ['GET', 'POST'],
        credentials: true
    },
});

const userSocketMap = {};

const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

io.on('connection', (socket) => {
    console.log('A user connected :', socket.id);

    const userId = socket.handshake.query.id;

    if (userId !== 'undefined') {
        userSocketMap[userId] = socket.id;
    }

    io.emit('activeUsers', Object.keys(userSocketMap));
    console.log('userSocketMap:', userSocketMap);

    socket.on('disconnect', () => {
        console.log('User disconnected :', socket.id);
        delete userSocketMap[userId];
        io.emit('activeUsers', Object.keys(userSocketMap));
        console.log('userSocketMap:', userSocketMap);
    });
});

module.exports = { app, io, server, getReceiverSocketId };