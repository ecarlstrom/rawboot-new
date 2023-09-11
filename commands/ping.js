// import { executionAsyncResource } from "async_hooks";
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with the user\'s ping'),
    async execute(interaction) {
        await interaction.reply('Pong!');
    }
}