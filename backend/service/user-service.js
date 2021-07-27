const User = require('../db/models/user.model');
const bcrypt = require('bcrypt');
const tokenService = require('./token-service');
const userDto = require('../dtos/user-dto');

class UserService {
    /*
    Find User by Email and Password
     */
    getUserByCredentials = (mail, password, cb) => {
        const query = {mail: mail};

        User.findOne(query, cb);
        /*   User.findOne(query,(err,user)=>{
                if (err) throw err;

                if(user){
                    bcrypt.compare(password, user.password, cb);
                }else{

                }
            });*/
    }

    /*
    Find User by ID
     */
    getUserById = (id, cb) => {
        User.findById(id, cb);
    }
    /*
    Create new User
     */
    addUser = (newUser, cb) => {
        bcrypt.genSalt(10, (err,salt) => {
            if(err) throw err;

            bcrypt.hash(newUser.password, salt, (err,hash) => {
                if(err) throw err;
                newUser.password = hash;
                const userDto = new userDto(newUser);
                console.log(userDto);
                newUser.save(cb);
            })
        })
    }
}

module.exports = new UserService();