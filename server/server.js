var express = require('express');
var path = require('path');
var cors = require('cors');
var api = require('./api');

var app = express();

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.set('port', port); 
app.set('ipaddr', ip);

app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/sana/:query', api.findWord); 
app.get('/full/:query', api.findText); 

app.listen(port, ip);
