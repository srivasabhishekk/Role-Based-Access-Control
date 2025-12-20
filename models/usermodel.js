const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : [true, "Please add the name of the user"],
        unique : true
    },
    password : {
        type : String,
        required : [true, "Please add password"]
    },
    role : {
        type : String,
        required : true,
        enum : ["admin", "manager", "user"]
    }
}, {
    timestamps : true
})

module.exports = mongoose.model("user", userSchema)