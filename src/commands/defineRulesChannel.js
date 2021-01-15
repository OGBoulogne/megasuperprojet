const defineRulesChannel = () => {
    if ( !message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).trim().split(' ')
    const command = args.shift().toLowerCase()

    if (command == 'setRules') {
        message.channel.send('TA GUEULE JULES')
    }
}

module.exports = defineRulesChannel
