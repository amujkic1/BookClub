const express = require('express')
const User = require('../models/userModel')
const router = express.Router()

router.post('/user', async (req, res) => {
    const{username, password, email} = req.body
    try{
        const user = await User.create({username, password, email})
        res.status(200).json(user)
    }catch(err){
        console.log(err)
        res.status(400).json({error: err.message})
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
});

module.exports = router