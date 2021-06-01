const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');


//Define a schema
const UserSchema = new mongoose.Schema({
    login:{
        type: String,
        minlength: 3,
        trim: true,
        required: true
    },
    email:{
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
    },
    sessions:[{
        ip:{
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        },
        last_active: {
            type: Date
        }
    }]
});

/*
Overwrites the return value.
Ensure that password and sessions are not shown by default
 */
UserSchema.methods.toJSON = () => {
    const user = this;
    const userObject = user.toObject;

    return _.omit(userObject,['password', 'sessions']);
};

/*
Find User by Email and Password
 */

UserSchema.statics.getUserByCredentials = () => {

}