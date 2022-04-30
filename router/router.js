const express = require("express")
const router = express.Router()
const {CreateUser,LoginUser} = require("../auth/Auth")
const UserModel = require("../model/UserModel")
const jwt = require("jsonwebtoken")

router.post("/register", CreateUser)
router.post("/login", LoginUser)


const verification = async (req,res,next)=>{
        const authToken = req.headers.authorization
        if(authToken){
            const token = authToken.split(" ")[1]
            if(token){
                jwt.verify(token,"ThisIsMySecretKey",(error,payload)=>{
                    if(error){
                        res.status(400).json({message: "Check your token"})
                    }else{
                        payload = next()
                    }
                })
            }else{
                res.status(400).json({message: "Check your token"})
            }
        }else{
            res.status(400).json({message: "You don't have right for this"})
        }
}


router.get("/users",verification, async (req,res)=>{
    try{    
            const getUsers = await UserModel.find()
            res.status(201).json({data: getUsers})
    }catch(error){
        res.status(404).json({message: error.message})
    }
})

module.exports = router