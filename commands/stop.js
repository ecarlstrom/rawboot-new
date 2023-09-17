const { SlashCommandBuilder } = require('discord.js');
const { GuildQueuePlayerNode, useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stops and clears the song queue'),
    async execute(interaction) {
        const { guild } = interaction;
        const channel = interaction.member.voice.channel;
        const queue = useQueue(guild.id);
        const guildQueue = new GuildQueuePlayerNode(queue);

        // update this for after first stop
        if(!queue || !GuildQueue) {
            return interaction.reply('No song currently playing.')
        }


        if (!channel) {
            return interaction.reply('HEY TOP! STILL! JOIN A VOICE CHANNEL!');
        } 

        await interaction.deferReply();

        try {
            guildQueue.stop(true);
            return interaction.followUp(`Queue has been stopped and cleared. Please blame 👉 ${interaction.member.nickname} 👈 for any inconvenience.`);
        } catch (e) {
            return interaction.followUp(`UH OH! ${e.stack}`);
        }
    }
}