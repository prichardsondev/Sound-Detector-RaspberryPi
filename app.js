const express = require('express');
const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http);

const SerialPort = require('serialport');
const ReadLine = require("@serialport/parser-readline");

// ls /dev/tty* to check port arduino connected to
const port = new SerialPort("/dev/ttyUSB0", {baudRate: 9600});
const parser = port.pipe(new ReadLine ());

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.sendFile('index.html'));

port.on('open', () => console.log("Serial port open"));

parser.on('data', data => io.sockets.emit('statedata', JSON.parse(data)));

http.listen(3000, () => console.log('Server listening on port 3000'));