const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = 3000;                                                 //Порт для подключения localhost

function Time() {                                                  //Время отправки сообщений
    let date = new Date();
    let hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    let min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    let sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    return hour + ":" + min + ":" + sec;
}

io.on('connection', function(socket){
    
    socket.on('send', function(name){                              //Выдача ника
        console.log('['+ Time()+']' + name + ' connected to server');
        socket.broadcast.emit('newUser', name);
        socket.emit('userName', name);
    
    socket.on('message', function(msg){                            //Приём-отправка сообщений   
        console.log('['+ Time()+']' + name + ' say: ' + msg);      //Обработчик сообщений
        socket.broadcast.emit('messageToClients', msg, name);      //Рассылка сообщений всем, кроме отправителя   
        });
    });
});


server.listen(port);                                               //Запуск сервера

module.exports = port;                                             //Экспорт модулей в client.js
module.exports = io;