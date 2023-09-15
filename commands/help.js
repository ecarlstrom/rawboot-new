const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const cowboyIcon = process.env.ICON;
// will need to update this and any similar references in the event of command subfolders like music commands
const commandFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('js'));
// for tomorrow: add optional parameter to look up help only for a specific command, add another data attribute to each that explains it more in-depth for the single-command version
module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Provides information on all the bot\'s commands'),
    async execute(interaction) {
        const helpEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`🤠 List of Commands 🤠`)
            .setDescription(`HELLO, ${interaction.member.nickname}, I AM HERE TO HELP`)
            .setThumbnail(cowboyIcon)
            .setFooter({ text: 'All commands are prefixed with a slash!', iconURL: cowboyIcon })
        
        for(const file of commandFiles) {
            const filePath = path.join(__dirname, file);
            const command = require(filePath);
            helpEmbed.addFields({ name: command.data.name, value: command.data.description })
        }   

        await interaction.reply({ embeds: [helpEmbed] });
    }
}