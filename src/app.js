const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const homeRoutes = require('./routes/home');
const { nextTick } = require('process');

const hostname = 'http://ec2-3-131-36-84.us-east-2.compute.amazonaws.com/';
//const hostname = 'localhost';
const port = 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(homeRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(port, hostname);