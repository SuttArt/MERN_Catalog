const mongoose = require('mongoose');

//Define a schema
const RoleSchema = new mongoose.Schema({
    login:{
        type: String,
        unique: true,
        default: 'USER'
    }
});

//Create Model
const Role = mongoose.model('Role', RoleSchema);