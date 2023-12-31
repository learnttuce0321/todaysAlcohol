import express from 'express';
import indexRouter from './routes/router.js';
import path from 'path';
import db from './models/index.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import multer from 'multer';
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();

const PORT = 8000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const __dirname = path.resolve();

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.use('/', indexRouter);

// aws설정
aws.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION,
});

// S3설정
const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, {
                fieldName: file.fieldname,
            });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + '-' + file.originalname);
        },
    }),
});

app.post('/community/write-img', upload.single('data'), (req, res) => {
    res.json({ imageUrl: req.file.location });
});

app.use('*', (req, res) => {
    res.render('404Page/404Page');
});

const countInRoom = (chatRoomId) => {
    const clients = io.sockets.adapter.rooms.get(chatRoomId);
    return clients?.size;
};
const getParticipant = (chatRoomId) => {
    const clients = io.sockets.adapter.rooms.get(chatRoomId);
    const participants = [];
    if (clients) {
        clients.forEach((socketId) => {
            const userSocket = io.sockets.sockets.get(socketId);
            participants.push(userSocket.userId);
        });
    }
    return participants;
};

io.on('connection', (socket) => {
    socket.on('createRoom', (data) => {
        socket.emit('createRoom', {
            roomName: data.roomName,
            chatRoomId: data.chatRoomId,
        });
    });

    socket.on('joinRoom', (data) => {
        socket.join(data.chatRoomId);
        socket.room = data.chatRoomId;
        socket.userId = data.userId;

        const size = countInRoom(data.chatRoomId);
        const participants = getParticipant(data.chatRoomId);
        io.to(socket.room).emit('size', { size, participants });
    });

    socket.on('send', (data) => {
        io.to(socket.room).emit('newMessage', data);
    });

    socket.on('disconnect', () => {
        if (socket.room) {
            const size = countInRoom(socket.room);
            const participants = getParticipant;
            io.to(socket.room).emit('size', { size, participants });
            socket.leave(socket.room);
        }
    });
});

db.sequelize.sync({ force: false }).then(() => {
    server.listen(PORT, () => {
        console.log(`http://localhost:8000`);
    });
});
