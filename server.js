const Discord = require("discord.js");
const config = require("./config.json")
const client = new Discord.Client();

const prefix = ">";
const ownerID = "361169817442713611";
const active = new Map();

const serverStats = {
    guildID: "461132711273168896",
    totalUsers: "464823082180411408",
    memberCount: "464823129663864832",
    botCount: "464823151474507776"
}

client.on("ready" , () => { console.log("Ready!") })

//  GUILD MEMBER ADD
client.on("guildMemberAdd" , member => {

    member.guild.channels.get('464823082180411408').setName(`Total Users: ${member.guild.memberCount}`)
    let humans = member.guild.members.filter(m => !m.user.bot).size;
    member.guild.channels.get('464823129663864832').setName(`Member Count: ${humans}`)
    let bots = member.guild.members.filter(m => m.user.bot).size;
    member.guild.channels.get('464823151474507776').setName(`Bot Count: ${bots}`)
});

//  GUILD MEMBER REMOVE
client.on("guildMemberRemove" , member => {
    
    member.guild.channels.get('464823082180411408').setName(`Total Users: ${member.guild.memberCount}`)
    let humans = member.guild.members.filter(m => !m.user.bot).size;
    member.guild.channels.get('464823129663864832').setName(`Member Count: ${humans}`)
    let bots = member.guild.members.filter(m => m.user.bot).size;
    member.guild.channels.get('464823151474507776').setName(`Bot Count: ${bots}`)
});

client.on("message" , message => {

    // Variables
    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();

    let ops = {
        ownerID: ownerID,
        active: active
    }

    // Return statements
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    // Command Handler
    try {

        let commandFile = require(`./commands/${cmd}.js`);
        commandFile.run(client , message , args , ops , prefix);

    } catch (e) {
        console.log(e.stack)
    }


})



client.login(process.env.TOKEN);