var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
var port = 3000;
var path = require("path");
var requests = require("./data/requests.json");

function updateRequests(requestString) {
    var same = requests.find(function (searchStr) {
            return requestString === searchStr.key;
        })

        !same && requests.push({
            key: requestString
        })
}

function getRelevant(query) {
    var requestQuery = new RegExp("^" + query, "i");
    return requests.filter(function (searchStr) {
        return requestQuery.test(searchStr.key);
    });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/scripts', express.static(__dirname + '/node_modules'));
app.use('/static', express.static(__dirname + '/public'));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./index.html"));
})

app.post("/search", function (req, res) {
    var key = req.body.key;
    var relevant = key ? getRelevant(key) : [];
    key && updateRequests(req.body.key);
    res.json(relevant);
})

app.listen(port, function () {
    console.log("Server is running on port " + port);
})