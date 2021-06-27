const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const https = require('https');

const homeRoutes = require('./routes/home');
const { nextTick } = require('process');

var privateKey  = fs.readFileSync('../keys/ssl-key.pem', 'utf8');
var certificate = fs.readFileSync('../keys/sslcert.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};

const hostname = '0.0.0.0';
const port = 8080;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(homeRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);
