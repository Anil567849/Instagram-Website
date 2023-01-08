import * as dotenv from 'dotenv';
dotenv.config({path : './config.env'});
import express from 'express';
const app = express();
import http from 'http';
const server = http.createServer(app);
import { Server } from "socket.io";


export const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
      }
});

import authRouter from './routes/auth.js';
import postRouter from './routes/post.js';
import queryRouter from './routes/query.js';
import chatRouter from './routes/chat.js';
import bodyParser from 'body-parser';
import cors from 'cors';



const corsOptions = {
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    methods : ['GET', 'POST'],
    optionSuccessStatus:200
}

app.use(cors(corsOptions));

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


// db connnection 
import "./database/database.js";


// socket io 
io.on('connection', (socket) => { 
    console.log('a user connected', socket.id);

    socket.on('new_user', (data) => {
        console.log('new_user', data);
    })
    
    // socket.on('message', (msg) => {
    //     console.log('message is', msg);
    // })
});

app.get('/', (req, res) => {
    res.send('hnji aaya tha');
})

app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/query', queryRouter);
app.use('/chat', chatRouter);

server.listen(process.env.PORT, (err, done) => {
    console.log('listenting to port ' + process.env.PORT + '...');
})
