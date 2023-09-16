const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const cowboyIcon = process.env.ICON;
// tomorrow: look into equalizer command for play as well
module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Displays the current music queue'),
    async execute(interaction) {
        const { member, guild } = interaction;
        const queue = useQueue(guild.id);
        
        if(!queue || queue.tracks.data.length < 1) {
            return interaction.reply('No songs currently queued.');
        }

        const queueEmbed = new EmbedBuilder()
        .setColor(0x0006b1)
        .setTitle(`🤠 Current Queue 🤠`)
        .addFields({ name: 'Now playing:', value: `${queue.currentTrack.title} by ${queue.currentTrack.author}`})
        .setThumbnail(cowboyIcon)
        .setFooter({ text: `Footer placeholder` })

        let trackData = queue.tracks.data;
        for(let i = 0; i < trackData.length; i++) {
            queueEmbed.addFields({ name: `Song #${i + 1}`, value: `${trackData[i].title} by ${trackData[i].author} (${trackData[i].duration})`})
        }
        console.log('queue:', queue.tracks.data);
        await interaction.reply({ embeds: [queueEmbed] });
    }
}