const { SlashCommandBuilder } = require('discord.js');
const { GuildQueuePlayerNode, useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pauses audio playback'),
    async execute(interaction) {
        const { guild } = interaction;
        const channel = interaction.member.voice.channel;
        const queue = useQueue(guild.id);
        const guildQueue = new GuildQueuePlayerNode(queue);

        if(!queue || !guildQueue) {
            return interaction.reply('No song currently playing.')
        }


        if (!channel) {
            return interaction.reply('HEY TOP! STILL! JOIN A VOICE CHANNEL!');
        } 

        await interaction.deferReply();

        try {
            if(!guildQueue.isPaused()) {
                guildQueue.pause();
                return interaction.followUp(`Playback paused.`);
            } else {
                return interaction.followUp('Playback is already paused. Use the /resume command to resume playing audio.')
            }
        } catch (e) {
            return interaction.followUp(`UH OH! ${e.stack}`);
        }
    }
}