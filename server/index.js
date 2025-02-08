require('dotenv').config();
const express = require('express');
const cors = require('cors')
const connectDB = require('./config/connectDB')
const userRouter = require('./routes/userRouter');
const messageRouter = require('./routes/messageRouter');
const cookieParser = require('cookie-parser');
const { app, server } = require('./socket/socket');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: [`https://chatting-app-chi.vercel.app`],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.get('/',(req, res) => {
    res.json('hello');
})

app.use('/user', userRouter);
app.use('/message', messageRouter);



const PORT = process.env.PORT || 5000;
connectDB();
server.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
})
