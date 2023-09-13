const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Extremely useful test command'),
    async execute(interaction) {
        await interaction.reply('I AM AN IMPORTANT TEST COMMAND');
    }
}