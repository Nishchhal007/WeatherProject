const express = require('express');

const app = express();

app.get("/",function (req,res) {
    res.send("Server setup finally")
})


app.listen(3000,function () {
    console.log("Server is running on port 3000");
})