exports.run = (client , message , args , ops) => {

    // Check if user is connected to a Voice Channel
    if (!message.member.voiceChannel) return message.reply("You are not in a voice channel.")
    
    // Check if user is connected to a Voice Channel
    if (!message.guild.me.voiceChannel) return message.reply("The bot is not connected to a voice channel.")

    // Check if member and bot are in same channel
    if (message.guild.me.voiceChannel !== message.member.voiceChannel) return message.reply("You are not in the same channel as the bot.")

    message.guild.me.voiceChannel.leave();

    message.channel.send(`Stopped playing and left **${message.guild.me.voiceChannel.name}**.`)
}