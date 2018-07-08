exports.run = async (client , message, args , ops) => {

    // Fetching guild object
    let fetched = ops.active.get(message.guild.id);

    // Check if fetch is defined
    if (!fetched) return message.reply("There is currently nothing playing in this server.")

    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.reply("You are not in the same channel as the bot.")

    // Fetch how many users are in the VC
    let userCount = message.member.voiceChannel.members.size;
    let required = Math.ceil(userCount/2);

    // Update fetched
    if (!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = [];

    // Check if user already voted
    if (fetched.queue[0].voteSkips.includes(message.member.id)) return message.reply(`You have already voted to skip. ${fetched.queue[0].voteSkips.length}/${required} required.`)

    // Add user to voteSkips
    fetched.queue[0].voteSkips.push(message.member.id);

    // Update map
    ops.active.set(message.guild.id , fetched);

    // Check if there are enough votes to skip
    if (fetched.queue[0].voteSkips.length >= required) {

        // Output
        message.channel.send("Successfully skipped the current song!");

        // Emit finish event and return
        return fetched.dispatcher.emit("finish");
    }

    // Otherwise tell user they added a vote
    message.channel.send(`Successfully voted to skip! ${fetched.queue[0].voteSkips.length}/${required} required.`);

}