const express = require('express');
const moogoose = require('mongoose');
const http = require('http');
const {usuario, senha, banco} = require('./config/config.json');
const {setupWebSocket} = require('./websocket');
const cors = require('cors');
const routes = require('./routes');


const app = express();
const server = http.Server(app);
setupWebSocket(server);

moogoose.connect(`mongodb+srv://${usuario}:${senha}@devradarcluster-hcvki.mongodb.net/${banco}?retryWrites=true&w=majority`,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);