require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env || 5000;

//Connection to DataBase
const { connectDB } = require('./db');

const start = async () => {
    try {
        await connectDB();
        await app.listen(PORT);
    } catch (e) {
        console.log(e);
    }
}
start().then(()=>{
    console.log(`Example app listening at http://localhost:${PORT.PORT}`);
});
