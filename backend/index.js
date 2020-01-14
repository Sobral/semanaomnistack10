const express = require('express');
const moogoose = require('mongoose');
const app = express();

moogoose.connect('mongodb+srv://omnistack:omnistack@devradarcluster-hcvki.mongodb.net/week10?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.listen(3333);