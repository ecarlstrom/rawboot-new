const { SlashCommandBuilder } = require('discord.js');
const { useMainPlayer } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Plays the requested song')
    .addStringOption(option => 
        option.setName('track')
        .setDescription('The track to play')
        .setRequired(true)),
    async execute(interaction) {
        const player = useMainPlayer();
        const channel = interaction.member.voice.channel;
        if (!channel) {
            return interaction.reply('HEY TOP! STILL! JOIN A VOICE CHANNEL!');
        }
        const input = interaction.options._hoistedOptions[0].value;
        await interaction.deferReply();

        try {
            const { track } = await player.play(channel, input, {
                nodeOptions: {
                    metadata: interaction
                }
            });
            // console.log("queue is", player.getQueue(interaction.guildId));
            return interaction.followUp(`**${track.title}** by ${track.author} added to queue!`);
        } catch (e) {
            return interaction.followUp(`UH OH! ${e.stack}`);
        }
    }
}