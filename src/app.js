const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const exphbs = require('express-handlebars');
const ItemsManager = require('./ItemsManager');

const manager = new ItemsManager(__dirname + '/files/items.json');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('Socket connected');

    socket.on('new item', async (newItem) => {
        await manager.addItem(newItem);
        const items = await manager.getItems();
        io.emit('list updated', items);
    });

    socket.on('delete item', async ({id}) => {
        await manager.deleteItem(id);
        const items = await manager.getItems();
        io.emit('list updated', {items:items});
    })
    
});



app.use((req, res, next) => {
    req.io = io;
    next();
});

app.get('/', async (req, res) => {
    const items = await manager.getItems();
    res.render('home', { items });
});

app.get('/realtimeitems', async (req, res) => {
    const items = await manager.getItems();
    res.render('realTimeItems', { items });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
