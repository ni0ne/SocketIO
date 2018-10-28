const io = require('socket.io-client');
const readline = require('readline');
const socket = io.connect('http://localhost:'+3000);

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

r1.question("Enter your nickname: ", function(name) {
    const nick = name;
    socket.emit('send', nick);
});

socket.on('userName', function(userName){
    console.log('userName: '+ userName);
});

socket.on('newUser', function(userName){
    console.log('New user connected: '+ userName);
});

r1.on('line', (input) => {
    socket.emit('message', input);
});

socket.on('messageToClients', function(msg, name){
    console.log('['+ Time()+']' + name +' > '+ msg);
});

function Time() {
    let date = new Date();
    let hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    let min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    let sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    return hour + ":" + min + ":" + sec;
}