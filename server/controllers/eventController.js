const Event = require("../models/eventModel")

async function createEvent(req, res){
    
    const { name, date, time, location } = req.body

    try{
        const event = await Event.create({name, date, time, location})
        res.status(200).json({message: "Event created successfully"})
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

module.exports = {
    createEvent
}