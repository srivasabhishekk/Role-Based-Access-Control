const User = require('../models/usermodel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    try{
        const { username, password, role } = req.body
        const existingUser = await User.findOne({username})
        if(existingUser){
            res
                .status(409)
                .json({message : "User already exists"})
        }else{
            const hashedPassword = await bcrypt.hash(password, 10)
            const user = await User.create({
                username,
                password : hashedPassword,
                role
            })

            res
                .status(201)
                .json({message : `User created with username ${user.username}`})
        } 
    }catch(err){
        console.log(err)
        res
            .status(501)
            .json({message : "Something wen't wrong"})
    }
}

const loginUser = async (req, res) => {
    try{
        const { username, password } = req.body
        const user = await User.findOne({username}) 
        if(!user){
            res
                .status(404)
                .json({message : `User not found with username ${username}` })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            res
                .status(400)
                .json({message : "Invalid Credentials"})
        }else{
            const token = jwt.sign({user_id : user._id, role : user.role}, process.env.SECRET_ACCESS_TOKEN, {expiresIn : "1h"})
            res
                .status(200)
                .json({token})
        }
    }catch(err){
        console.log(err)
        res 
            .status(500)
            .json({message : "something wen't wrong"})
    }
}

module.exports = { registerUser, loginUser }