const mongoose = require('mongoose')

const logSchema = new mongoose.Schema({
    discord_id: { type: String, required: true },
    channel_id: { type: String, required: true },
    content: { type: String, required: true },
    time: { type: Date, required: true },
})

const LogModel = mongoose.model('Log', logSchema)

module.exports = LogModel