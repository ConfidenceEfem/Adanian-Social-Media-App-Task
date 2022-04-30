const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        unique: true,
        required: true,
    },
    Password:{
        type: String,
        required: true,
    },
    userId: {
        type: Number,
        required: true
    }
},
{
    timestamps: true
})

const UserModel = mongoose.model("UserModel",UserSchema)

module.exports = UserModel