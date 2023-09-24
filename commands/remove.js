const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { GuildQueuePlayerNode, useQueue } = require('discord-player');
const cowboyIcon = process.env.ICON;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription('Removes a specific song from the queue. Refer to song numbers provided by the /queue command.')
        .addNumberOption(option =>
            option.setName('number')
            .setDescription('Queue number of the song to remove')
            .setRequired(true)),
    async execute(interaction) {
        const { guild } = interaction;
        const channel = interaction.member.voice.channel;
        const queue = useQueue(guild.id);
        const guildQueue = new GuildQueuePlayerNode(queue);

        if (!channel) {
            return interaction.reply('HEY TOP! STILL! JOIN A VOICE CHANNEL!');
        } else if(!queue) {
            return interaction.reply('No song currently playing.')
        }

        var trackPosition = interaction.options._hoistedOptions[0].value - 1;
        await interaction.deferReply();

        try {
            if(queue.tracks.data[trackPosition]) {
                guildQueue.remove(queue.tracks.data[trackPosition]);
                if(queue.tracks.data.length < 1) {
                    interaction.editReply('Track removed! No songs in queue now.');
                } else {
                    const queueEmbed = new EmbedBuilder()
                        .setColor(0x0006b1)
                        .setTitle(`🤠 Current Queue 🤠`)
                        .addFields({ name: 'Now playing:', value: `${queue.currentTrack.title} by ${queue.currentTrack.author}`})
                        .setThumbnail(cowboyIcon)
                        .setFooter({ text: `Footer placeholder` })
                    let trackData = queue.tracks.data;
                    for(let i = 0; i < trackData.length; i++) {
                        queueEmbed.addFields({ name: `🤠 Song #${i + 1}`, value: `${trackData[i].title} by ${trackData[i].author} (${trackData[i].duration})`})
                    }
                    await interaction.editReply('Track removed! New queue:\n');
                    return interaction.followUp({ embeds: [queueEmbed] });
                }
            } else {
                return interaction.followUp('Please provide a valid queue number.')
            }
        } catch (err) {
            console.log(err.stack);
            return interaction.followUp(`Error encountered while removing track.`);
        }
    }
}