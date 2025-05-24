const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({   
    username: String,
    email: String,
    password: String,
    role:{
        type: String,
        enum: ['Admin', 'User'],
        default: 'User'
    },
    createdAt: { type: Date, default: Date.now }
})

module.exports=mongoose.model("User", userSchema);