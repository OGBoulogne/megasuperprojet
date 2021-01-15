const Discord = require('discord.js')
const supermegaprojet = new Discord.Client()
const mongoose = require('mongoose')
const fetch = require('node-fetch')
const { DateTime } = require('luxon')
const welcome = require('./events/welcome')
const defineRulesChannel = require('./commands/defineRulesChannel')


require('./jobs/clearLogs')

require('dotenv').config()

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const Log = require('../@Database/Log')


const logUserMessage = async(message) => {
    await Log.create({ discord_id: message.author.id, channel_id: message.channel.id, content: message.content, time: DateTime.local()})
    return console.log(`${DateTime.local().toString()} - ${message.author.tag} : ${message.content}`)
}
 
//supermegaprojet.on('message', message => console.log(message))
// supermegaprojet.on('message', message => logUserMessage(message)).catch(e => console.log(error))

const getTopRedditWorldNews = async () => {

    const formatTopWorldNews = async jsonData => {
        console.log(jsonData[0])
    }

    fetch('https://api.pushshift.io/reddit/search/submission/?subreddit=worldnews&sort=desc&sort_type=created_utc&after=1523588521&before=1523934121&size=1000')
        .then(res => res.text())
        .then(json => formatTopWorldNews(json))
}

supermegaprojet.on('ready', async () => {
    console.log(`Running bot`)
    getTopRedditWorldNews()
})

// supermegaprojet.on('msg', message => {

// })
console.log(defineRulesChannel())
// supermegaprojet.on('guildMemberAdd', (member) => { welcome.welcome(member) } )
supermegaprojet.on('guildMemberAdd', member => welcome(supermegaprojet, member) )
supermegaprojet.login(process.env.DISCORD_TOKEN)
