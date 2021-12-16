const express = require('express');
const app = express();
const PORT = 3000;
const http = require('http');
const server = http.createServer(app);
//
const { Server } = require("socket.io");
const io = new Server(server);
//
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));
//
app.get('/in',(req,res)=>{
    res.render('index.ejs');
});

app.get('/',(req,res)=>{
    res.render('home.ejs');
});
//

const users = [];
const removeName = (value)=>{
    const wRem = users.indexOf(value);
    users.splice(wRem,1);
    console.log(users);
};
const addName = (value)=>{
    users.push(value);
    console.log(users);
};
//
io.on('connection',(socket)=>{
    socket.on('CLIENT_NAME',(value)=>{
        addName(value);
        io.emit('nameBack',value);
        io.emit('giveAllName',users);
        socket.on('disconnect',()=>{
            removeName(value);
            io.emit('nameBack',value);
            io.emit('giveAllName',users);
        io.emit('how_many',users.length);
        });
        io.emit('how_many',users.length);
    });

    socket.on('sentPosi',(value)=>{
        io.emit('sentBack',value);
    });
    socket.on('disconnect',()=>{
    });
});

//
server.listen(PORT, () => console.info(`Listening on port ${PORT}`));