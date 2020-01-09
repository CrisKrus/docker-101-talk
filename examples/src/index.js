var express = require("express");
var app = express();

app.get("/hello", (req, res, next) => {
    console.log("Request");
    res.json({message: "Hello World!!"});
});

app.listen(8080, () => {
    console.log("Server running on port 8080");
});
