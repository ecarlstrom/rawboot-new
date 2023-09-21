const { SlashCommandBuilder } = require('discord.js');
const { GuildQueuePlayerNode, useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Resumes audio playback'),
    async execute(interaction) {
        const { guild } = interaction;
        const channel = interaction.member.voice.channel;
        const queue = useQueue(guild.id);
        const guildQueue = new GuildQueuePlayerNode(queue);

        if (!channel) {
            return interaction.reply('HEY TOP! STILL! JOIN A VOICE CHANNEL!');
        } 
        
        if(!queue || !guildQueue) {
            return interaction.reply('No song currently playing.')
        }

        await interaction.deferReply();

        try {
            if(guildQueue.isPaused()) {
                guildQueue.resume();
                return interaction.followUp(`Playback resumed.`);
            } else {
                return interaction.followUp(`Playback is not paused, you silly <:gooseblush:901957268692672582>`)
            }
        } catch (e) {
            return interaction.followUp(`UH OH! ${e.stack}`);
        }
    }
}