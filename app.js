var express = require("express");
var fs = require("fs");
var app = express();
app.use(express.logger());

app.get(['/', '/index.html'], function(req, res) {
        fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, text){
        res.send(text);
    });
});

app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
