require('dotenv').config();
const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const requestIp = require('request-ip');

const app = express();
const PORT = process.env || 5000;
//Connection to DataBase
const { connectDB } = require('./db');
const router = require('./routes');
const errorHandler = require('./middleware/errorHandlingMiddleware');

//region Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(requestIp.mw())
app.use(express.static(__dirname + '/static'));
app.use('/api',router);
//endregion Middleware


app.get('/', (req,res) => {
    res.sendStatus(200);
})


//Error handler. Should always be last middleware!
app.use(errorHandler);

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
