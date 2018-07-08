const ytdl = require("ytdl-core");

exports.run = async (client , message , args , ops , prefix) => {
    
    // Check if member is in a voice channel
    if (!message.member.voiceChannel) return message.reply("Please join a voice channel to listen to music.")

    // Check if there is URL after command
    if (!args[0]) return message.reply("Please input a URL after the command.")

    // Validation of URL
    let validate = await ytdl.validateURL(args[0]);

    if (!validate) {
        let commandFile = require("./search.js")
        return commandFile.run(client , message , args , ops , prefix)
    }

    // Define info
    let info = await ytdl.getInfo(args[0]);
    
    // Fetch active
    let data = ops.active.get(message.guild.id) || {};

    // Update data
    if (!data.connection) data.connection = await message.member.voiceChannel.join();
    if (!data.queue) data.queue = [];
    data.guildID = message.guild.id;

    // Add song to the queue
    data.queue.push({
        songTitle: info.title,
        requester: message.author.tag,
        url: args[0],
        announceChannel: message.channel.id
    });

    if (!data.dispatcher) play(client , ops , data);
    else {
        message.channel.send(`Added to queue **${info.title}** | Requested by *${message.author.username}*.`)
    } 

    ops.active.set(message.guild.id , data);

}

// Play function
async function play(client , ops , data ) {
    // Now playing
    client.channels.get(data.queue[0].announceChannel).send(`Now playing: **${data.queue[0].songTitle}** | Requested by *${data.queue[0].requester}*.`)

    // Update dispatcher data
    data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url , {filter: "audioonly"}));
    data.dispatcher.guildID = data.guildID;

    // Listener event when song ends
    data.dispatcher.once("finish" , function() {
        finish(client , ops , this);
    });
}

// Finish function

function finish(client , ops , dispatcher) {

    // Fetch object from guild map
    let fetched = ops.active.get(dispatcher.guildID)
    
    // Remove first item in queue
    fetched.queue.shift();

    // Check if queue is empty
    if (fetched.queue.length > 0) {
        ops.active.set(dispatcher.guildID , fetched);
    
        play (client , ops , fetched)
    
    } else {
        ops.active.delete(dispatcher.guildID);

        // Leave the voice channel
        let vc = client.guilds.get(dispatcher.guildID).me.voiceChannel;
        if (vc) vc.leave;
    }

}