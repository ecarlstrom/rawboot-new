const { SlashCommandBuilder } = require('discord.js');
const { GuildQueuePlayerNode, useMainPlayer, useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skips the currently playing song'),
    async execute(interaction) {
        const player = useMainPlayer();
        const { guild } = interaction;
        const channel = interaction.member.voice.channel;
        const queue = useQueue(guild.id);
        const guildQueue = new GuildQueuePlayerNode(queue);
        var currentData = queue.currentTrack;

        if (!channel) {
            return interaction.reply('HEY TOP! STILL! JOIN A VOICE CHANNEL!');
        }

        await interaction.deferReply();

        try {
            guildQueue.skip();
            return interaction.followUp(`${currentData.title} by ${currentData.author} has been skipped. Please blame 👉 ${interaction.member.nickname} 👈 for any inconvenience.`);
        } catch (e) {
            return interaction.followUp(`UH OH! ${e.stack}`);
        }
    }
}