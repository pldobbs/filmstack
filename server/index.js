require("dotenv").load();
var express = require("express");
var cool = require('cool-ascii-faces');
var path = require("path");
var bodyParser = require("body-parser");
var api = require('./api');
var cookieParser = require('cookie-parser');
var configurePassport = require('./config/passport');
var userProc = require('./procedures/users.proc');
var utils = require('./config/utils');
var mdb = require('moviedb')(process.env.TMDB_API_KEY);

var app = express();


// added this to try to get Heroku to work
app.set('port', (process.env.PORT || 3000));


var clientPath = path.join(__dirname, "../client");
app.use(express.static(clientPath));
app.use(bodyParser.json());
app.use(cookieParser());
configurePassport(app);
app.use("/api", api);

app.get('/', function(req, res) {
    res.send(console.log('Hello World!'));
});

app.get('*', function(req, res, next) {
    if (isAsset(req.url)) {
        return next();
    } else {
        res.sendFile(path.join(clientPath, 'index.html'));
    }
});

function isAsset(path) {
    var pieces = path.split('/');
    if (pieces.length === 0) {
        return false;
    }
    var lastPiece = pieces[pieces.length - 1];
    if (path.indexOf('/api') !== -1 || path.indexOf('/?') !== -1) {
        // if the path contains /api or /?
        return true;
    } else if (lastPiece.indexOf('.') !== -1) {
        //if the last pieces of the url (the part after the last/) contains a dot, it must be an asset
        return true;
    } else {
        return false;
    }
}

// app.listen(3000);
app.listen(app.get('port'));
// console.log('Server listening on port' + port);

console.log('Node app is running on port', app.get('port'));