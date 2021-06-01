const mongoose = require('mongoose');

/*let db_url = process.env.MONGO_DB_URL;

if (process.env.PROD) {
    db = 'mongodb://db:27017/catalog'
}*/


//Create connection
const connectDB = async() => {
    await mongoose.connect(process.env.MONGO_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(()=>{
        console.log("Успешное подключение к базе данных");
    }).catch((e) =>{
        console.log("Ошибка подключения к базе данных");
        console.log(e);
    });
}

module.exports = {
    connectDB
}