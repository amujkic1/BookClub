const User = require("../models/userModel")
const jwt = require('jsonwebtoken')
const validator = require('validator')
const bcrypt = require('bcrypt')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '3d'})
}

async function login(req, res) {

    const{email, password} = req.body
    console.log(req.body)
    
    try{
        const user = await User.login(email, password)        
        const token = createToken(user._id)

        res.cookie("jwt", token, {
        httpOnly: true, // client JS ne može čitati cookie
        //secure: process.env.NODE_ENV === "production", // samo HTTPS u produkciji
        secure: false,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000 // 1 dan
        });
        
        res.status(200).json({email})
    } catch(err){
        console.log(err)
        res.status(400).json({error: err.message})
    }

} 

async function currentUser(req,res) {
    const token = req.cookies.jwt
    if(!token) return res.status(401).json({message: "Not logged in"})
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        res.json({user: decoded})
    }catch(err){
        res.status(401).json({message: "Invalid token"})
    }
}

async function signup(req, res) {
    
    const {username, email, password} = req.body
    
    try{
        const user = await User.signup(username, email, password)
        console.log(user)
        
        const token = createToken(user._id)
        
        res.status(200).json({username, email, token})
    } catch(err){
        res.status(400).json({error: err.message})
    }
}

async function getAllUsers(req, res) {
    try{
        const users = await User.find()
        console.log(users)
        res.status(200).json(users)
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

async function createUser(req, res) {
    
    const {username, email, password} = req.body
    
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields must be filled!' });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Email is not valid' });
    }
    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ error: 'Password not strong enough' });
    }
    
    try{
        const exists = await User.findOne({email})
        if(exists){
            return res.status(400).json({error: "Email already in use"})
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await User.create({username, email, password: hash})

        res.status(200).json({message: "User created successfully", email})
    
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

async function findUserByEmail(req, res) {
    
    const { email } = req.body

    try{
        const user = await User.findOne({email})
        res.status(200).json({username: user.username, email})
    }catch(err){
        res.status(500).json({error: "Email does not exist"})
    }
}

async function deleteUser(req, res) {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        await User.deleteOne({ email });
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        return res.status(500).json({ error: "An error occurred while deleting the user" });
    }
}

async function updateUser(req, res) {
 
    const { currentEmail, newEmail, newPassword, ...updates } = req.body;

    try {

        if (newEmail) {
            const emailExists = await User.findOne({ email: newEmail });
            if (!validator.isEmail(newEmail)) {
                return res.status(400).json({ error: 'Email is not valid' });
            }
            if (emailExists) {
                return res.status(400).json({ message: "New email already in use" });
            }

            updates.email = newEmail; 
        }

        if (newPassword) {
            if (!validator.isStrongPassword(newPassword)) {
                return res.status(400).json({ error: 'Password not strong enough' });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            updates.password = hashedPassword; 
        }

        const updatedUser = await User.findOneAndUpdate(
            { email: currentEmail },
            { $set: updates },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (err) {
        return res.status(500).json({ error: "An error occurred while updating the user" });
    }
}


module.exports = {
    signup,
    login,
    createUser,
    findUserByEmail,
    deleteUser,
    updateUser,
    getAllUsers,
    currentUser
}