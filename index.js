
const io = require('socket.io')(8000 , {
    cors:{
        orgin:"*",
    },
});


const users={};

io.on('connection', socket => {
    socket.on('new-user-joined' , name1 => {
       
        users[socket.id] = name1;
        socket.emit('you-joined' , name1);
        socket.broadcast.emit('user-joined' , name1);
    });


    socket.on('disconnect' , () =>  {
        socket.broadcast.emit('user-left' , users[socket.id])
        delete users[socket.id]

    });

    socket.on('send' , message => {
        socket.broadcast.emit('receive' , {message : message, name1 : users[socket.id]})
    });
})