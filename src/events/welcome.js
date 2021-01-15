const welcome = async(client, member) => {
    const user = await client.users.fetch(member.id)
    return user.send(`Bienvenue ${user.tag} ! Veux-tu déguster mon kiki?`)
}

module.exports = welcome