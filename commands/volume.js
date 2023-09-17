const { SlashCommandBuilder } = require('discord.js');
const { GuildQueuePlayerNode, useMainPlayer, useQueue } = require('discord-player');
const { is } = require('css-select');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('volume')
    .setDescription('Sets the volume of the player. Type "level" instead of a number to see the current volume level.')
    .addStringOption(option => 
        option.setName('level')
        .setDescription('Desired volume level.')
        .setRequired(true)),
    async execute(interaction) {
        const { guild } = interaction;
        const channel = interaction.member.voice.channel;
        const queue = useQueue(guild.id);
        const guildQueue = new GuildQueuePlayerNode(queue);
        var currentVolume = guildQueue.volume;
        var input = interaction.options._hoistedOptions[0].value;

        // can write this better later, quick working version here
        if(isNaN(input)) {
            if(input.toLowerCase() == "level") {
                return interaction.reply(`Current volume is ${currentVolume}%.`)
            } else {
                return interaction.reply('Please use only a number with no letters or special characters.')
            }
        } else if(input > 100) {
            return interaction.reply('👂👂 Hello, I am a pair of ears. Please be considerate to me and do not set the volume to anything outrageous. 👂👂')
        }

        if (!channel) {
            return interaction.reply('HEY TOP! STILL! JOIN A VOICE CHANNEL!');
        } else if(!queue) {
            return interaction.reply('No song currently playing.')
        }

        await interaction.deferReply();

        try {
            guildQueue.setVolume(parseInt(input, 10));
            return interaction.followUp(`Player volume set from ${currentVolume}% to ${input}%.`);
        } catch (e) {
            return interaction.followUp(`UH OH! ${e.stack}`);
        }
    }
}