const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



//Define a schema
const UserSchema = new mongoose.Schema({
    login:{
        type: String,
        minlength: 3,
        trim: true,
        required: true
    },
    mail:{
        type: String,
        minlength: 6,
        trim: true,
        required: true,
        unique: true
    },
    password:{
        type: String,
        minlength: 8,
        trim: true,
        required: true
    }
});


//Create Model
const User = mongoose.model('User', UserSchema);

//Export Model
module.exports = User;


/*
Find User by Email and Password
 */
module.exports.getUserByCredentials = (mail, cb) => {
    const query = {mail: mail};
    User.findOne(query,cb);
}

/*
Find User by ID
 */
module.exports.getUserById = (id, cb) => {
    User.findById(id, cb);
}

/*
Create new User
 */
module.exports.addUser = (newUser, cb) => {
        bcrypt.genSalt(10, (err,salt) => {
            if(err) throw err;

            bcrypt.hash(newUser.password, salt, (err,hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save(cb);
            })
        })
}



