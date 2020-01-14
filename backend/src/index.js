const express = require('express');
const moogoose = require('mongoose');


const routes = require('./routes');


const app = express();

moogoose.connect('mongodb+srv://omnistack:omnistack@devradarcluster-hcvki.mongodb.net/week10?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(routes);

app.listen(3333);