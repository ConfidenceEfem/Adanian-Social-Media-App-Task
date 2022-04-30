const express = require("express")
const bcrypt = require("bcrypt")
const User = require("../model/UserModel")
const jwt = require("jsonwebtoken")


const CreateUser = async (req,res)=>{
    try{
        const CreateId = Math.floor(Math.random() * 100000)
        const {Password, Email, Name} = req.body

        const saltPassword = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(Password, saltPassword)

        const CreateUser = await User.create({
            userId: CreateId,
            Password:hashPassword,
            Name,
            Email,
            
        })
        res.status(201).json({message: "User created Successfully", data:CreateUser })
    }catch(error){
        res.status(404).json({message: error.message})
    }
}

const LoginUser = async (req,res) =>{
    try {
        const {Email, Password} = req.body
        const findUser = await User.findOne({Email})
        if(!findUser){
            
        }else{
            const checkPassword = await bcrypt.compare(Password, findUser.Password)
            if(!checkPassword){
                res.status(404).json({message: "Incorrect Password"})
            }else{
               
                const token = jwt.sign(
                    {
                        userId: findUser.userId,
                        Email: findUser.Email,
                        Name: findUser.Name
                    },
                    "ThisIsMySecretKey",
                    {expiresIn: "1d"}
                )
                res.status(201).json({message: "You have been Login Successfully", data: {findUser, token: token}})
            }
        }
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

module.exports = {
    CreateUser,
    LoginUser
}