var express = require('express');
var mongo = require('mongodb');
var path = require('path');

var app = express();

app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080); 
app.set('ipaddr', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080,
    server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
 
var dbUser = process.env.SUOMI_USERNAME,
	dbPass = process.env.SUOMI_PASSWORD;

var dbHost = dbUser + ":" + dbPass + "@ds063180.mongolab.com",
    dbPort = 63180;

var uri = 'mongodb://' + dbHost + ':' + dbPort + '/suomi';
//var uri = 'mongodb://localhost:27017/stage';

function getHeadword (searchString, callback) {

	mongo.MongoClient.connect(uri, function(err, db) {
        if(err) throw err;

		cursor = db.collection("sanat").find(
            { "headword": searchString.toString() }, 
            { 'sort': 'headword' });

		cursor.toArray(
			function(error, docs){
				if (docs.length === 0) {
					callback(false);
				} else {
					callback(docs);
				}
			}); // toArray callbacks
	});
}

function getCitations (searchText, callback) {


	mongo.MongoClient.connect(uri, function(err, db) {
	if(err) throw err;
		db.collection("citations", function(error, collection){
			collection.find({ 
				$text: { $search: searchText.toString() } 
				},  { limit : 10 }, 
			function(error, cursor){
				cursor.toArray(
					function(error, docs){
						if (docs.length === 0) {
							callback(false);
						} else {
							callback(docs);
						}
					});
			});
		});
	});
}


app.get('/sana/:query', function (req, res) {
	getHeadword(req.params.query, function(docs){
		if (!docs) {
			res.status(200).json([]);
		} else {
			res.status(200).json(docs);
		}
	});
}); 

app.get('/full/:search', function (req, res) {
	getCitations(req.params.search, function(docs){
		if (!docs) {
			res.status(200).json([]);
		} else {
			res.status(200).json(docs);
		}
	});
}); 


app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

var server = app.listen(server_port, server_ip_address, function () {
    console.log("Visit: " + server_ip_address + ':' + server_port);
});