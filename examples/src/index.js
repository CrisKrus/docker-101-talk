const express = require("express");
const app = express();

const PORT = 8080;

app.get("/hello", (req, res, next) => {
    console.log("--> Hello request");
    res.json({message: "Hello World!!"});
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
