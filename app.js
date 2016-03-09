const bodyParser        =   require('body-parser');
const express           =   require('express');
const jade              =   require('jade');
const app               =   express();
const server            =   app.listen(3000);
const io                =   require('socket.io')(server);

app.set('view engine', 'jade');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended    :   true
}));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/game', (req, res) => {
    res.render('game');
});

io.on('connection', socket => {
    console.log('connected');

    socket.on('key', key => {
        console.log(key);
        socket.broadcast.emit('key', key);
    });
});
