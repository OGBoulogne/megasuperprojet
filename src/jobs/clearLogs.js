const schedule = require('node-schedule')
const mongoose = require('mongoose')
const { DateTime } = require('luxon')
const Log = require('../../@Database/Log')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const clearingLogs = schedule.scheduleJob('* * * * *', async() => {
    await Log.find({ time: { $lte: DateTime.local().plus({ seconds: 2 })} }).remove().exec()
})

module.exports = clearingLogs