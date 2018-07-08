exports.run = (client , message , args , ops) => {
    
    if (message.author.id !== ops.ownerID) return message.channel.send("Only the owner can use this!")

    if (!args[0]) return message.channel.send("Please type the name of the command to be reloaded!")

    try {
        delete require.cache[require.resolve(`./${args[0]}.js`)]

    } catch(e) {
        return message.channel.send(`Unable to reload \`${args[0]}.js\``)
    }

    message.channel.send(`Successfully reloaded \`${args[0]}.js\``)
}