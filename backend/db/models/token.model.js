const mongoose = require('mongoose');

//Define a schema
const TokenSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    refreshToken:{
        type: String,
        required: true
    }
});


//Create Model
const Token = mongoose.model('Token', TokenSchema);

//Export Model
module.exports = Token;