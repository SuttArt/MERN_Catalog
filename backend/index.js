require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env || 5000;
//Connection to DataBase
const { connectDB } = require('./db');
const router = require('./routes');
const errorHandler = require('./middleware/errorHandlingMiddleware');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api',router);


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
