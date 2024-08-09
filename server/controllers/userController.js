const User = require("../models/userModel")
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '3d'})
}

async function login(req, res) {

    const{username, email, password} = req.body
    console.log(req.body)
    
    try{
        const user = await User.login(username, email, password)
        
        const token = createToken(user._id)
        
        res.status(200).json({email, token})
    } catch(err){
        console.log(err)
        res.status(400).json({error: err.message})
    }

} 

async function signup(req, res) {
    const {username, email, password} = req.body
    
    try{
        const user = await User.signup(username, email, password)
        console.log(user)
        
        const token = createToken(user._id)
        
        res.status(200).json({email, token})
    } catch(err){
        res.status(400).json({error: err.message})
    }
}

module.exports = {
    signup,
    login 
}