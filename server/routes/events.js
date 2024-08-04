const express = require('express')
const Event = require('../models/eventModel')
const router = express.Router()

router.post('/event', async (req, res) => {
    const{name, date, location} = req.body
    
    try{
        const event = await Event.create({name, date, location})
        res.status(200).json(event)
    }catch(err){
        console.log(err)
        res.status(400).json({error: err.message})
    }
})

module.exports = router