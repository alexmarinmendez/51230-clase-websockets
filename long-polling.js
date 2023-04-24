const express = require('express');
const events = require('events');
const moment = require('moment');
const app = express();
const port = 3000;
const messageEventEmitter = new events.EventEmitter();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'))

let log = []

app.get('/messages', (req, res) => {
    console.log(`${moment()} - Waiting for new message...`);
    messageEventEmitter.once('newMessage', (message) => {
        console.log(`${moment()} - Message Received - message: ${message}`);
        res.send({ok: true, message});
    });
});

app.post('/new-message', (req, res) => {
    const {message} = req.body;
    console.log(`${moment()} - New Message - message: ${message}`);
    log.push(message)
    messageEventEmitter.emit('newMessage', log);
    res.send({ok: true, description: 'Message Sent!'});
});

app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
});