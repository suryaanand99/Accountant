const mongoose = require('mongoose');
  
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    accessToken:{
        type:String
    }
},{
    timestamps: true
});

const User = mongoose.model('User',userSchema);

module.exports = User;