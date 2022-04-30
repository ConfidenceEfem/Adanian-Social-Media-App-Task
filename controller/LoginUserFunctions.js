const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const UserModel = require("../model/UserModel")

const verification = async ()=>{
    const authToken = req.headers.authorization
    if(authToken){
        const token = authToken.split(" ")[1]
        if(token){
            
        }else{
            res.status(404).json({message: "Check your token"})
        }
    }else{
        res.status(404).json({message: "You don't have credential right for this operation"})
    }
}


module.exports = {
    verification,
    getAllUsers
}