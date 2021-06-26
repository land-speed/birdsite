const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const homeRoutes = require('./routes/home');
const { nextTick } = require('process');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(homeRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000, '0.0.0.0');