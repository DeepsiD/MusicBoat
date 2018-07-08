const Discord = require("discord.js");

exports.run = async (client , message , args , ops , prefix) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("This command required the permission: Administrator")

    if (!args[0]) return message.channel.send(`Proper usage: \`${prefix}poll <question>\``)

    const embed = new Discord.RichEmbed()
    .setColor(0xffffff)
    .setFooter("React to vote")
    .setDescription(args.join(' '))
    .setTitle(`Poll created by ${message.author.username}`)

    let msg = await message.channel.send(embed)

    await msg.react('✅');
    await msg.react('❎');

    message.delete({timeout: 1000});
}