var express = require('express');
var mongo = require('mongodb');
var path = require('path');

var app = express();

app.set('view engine', 'jade')
app.use(express.static(path.join(__dirname, 'public')));

var dbHost = "127.0.0.1"
var dbPort = mongo.Connection.DEFAULT_PORT;

function getHeadword (searchString, callback) {

	var db = new mongo.Db("stage", new mongo.Server(dbHost, dbPort, {}));

	db.open(function(error){
		db.collection("sanat", function(error, collection){
			collection.find({ 
				$text: { $search: searchString.toString() } 
				},  { "limit" : 10 , "sort" : "headword"}, 
			function(error, cursor){
				cursor.toArray(
					function(error, docs){
						if (docs.length == 0) {
							callback(false);
						} else {
							callback(docs);
						}
					});
			});
		});
	});
};

function getCitations (searchText, callback) {

	var db = new mongo.Db("stage", new mongo.Server(dbHost, dbPort, {}));

	db.open(function(error){
		db.collection("citations", function(error, collection){
			collection.find({ 
				$text: { $search: searchText.toString() } 
				},  { limit : 10 }, 
			function(error, cursor){
				cursor.toArray(
					function(error, docs){
						if (docs.length == 0) {
							callback(false);
						} else {
							callback(docs);
						}
					});
			});
		});
	});
};


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

module.exports = app;

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Listening at http://%s:%s', host, port)

})