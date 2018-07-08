exports.run = (client , message , args , ops , prefix) => {

    // Fetching guild object
    let fetched = ops.active.get(message.guild.id);

    // Check if fetch is defined
    if (!fetched) return message.reply("There is currently nothing playing in this server.")
    
    // If bot VC = member VC
    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.reply("You are not in the same channel as the bot.")

    // If dispatcher is already paused
    if (!fetched.dispatcher.paused) return message.reply("The music is already playing.")

    // Finally if hasn't returned yet, pause music
    fetched.dispatcher.resume();

    // Output
    message.channel.send(`Successfully resumed **${fetched.queue[0].songTitle}**.`)

}