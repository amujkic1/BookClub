const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    atendees: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: false
        }
    ]
});

module.exports = mongoose.model('Event', eventSchema);