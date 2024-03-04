const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const indexRoute = require('./routes/index');

app.set('view engine','ejs');
app.set('views','views');




const sessionMiddleware = session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: true
});

app.use(sessionMiddleware);

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.use(indexRoute);

io.use((socket, next) => {
    // Wrap the socket handshake with session middleware
    sessionMiddleware(socket.request, {}, next);
});

io.on('connection', socket => {
    console.log("User Connected");
    const sessionId = socket.request.session.sessionID;
    if (sessionId) {
        console.log(`User joined session: ${sessionId}`);
        socket.join(sessionId);
    }
    socket.sessionId = sessionId;
    socket.on('join',sId=>{
        console.log("User joined the session : ",sId);
        socket.join(sessionId);
    })
    socket.on('chat-message', message => {
        console.log("message from socket ",message);
        io.to(socket.sessionId).emit('message', message);
    })
});

server.listen(9000, () => {
    console.log('Listening at port 9000');
});