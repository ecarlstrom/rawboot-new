const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { GuildQueuePlayerNode, useQueue } = require('discord-player');
const cowboyIcon = process.env.ICON;
// general note: can make a utils folder or something so things like queueEmbed code or icons can exist only in one place
// for things like this will probably need a vote or similar system to prevent abuse, simple version for now
module.exports = {
    data: new SlashCommandBuilder()
        .setName('swap')
        .setDescription('Swaps the position of two songs in the queue. Refer to song numbers provided by the /queue command.')
        .addStringOption(option => 
            option.setName('first')
            .setDescription('Number of first track to swap')
            .setRequired(true))
        .addStringOption(option => 
            option.setName('second')
            .setDescription('Number of second track to swap')
            .setRequired(true)),    
    async execute(interaction) {
        const channel = interaction.member.voice.channel;
        const { guild } = interaction;
        const queue = useQueue(guild.id);
        const guildQueue = new GuildQueuePlayerNode(queue);

        if (!channel) {
            return interaction.reply('HEY TOP! STILL! JOIN A VOICE CHANNEL!');
        } 

        if(!queue || queue.tracks.data.length < 1) {
            return interaction.reply('No songs currently queued.');
        }

        if(queue.tracks.data.length < 2) {
            return interaction.reply('Queue must have at least two songs to use the swap command.')
        }

        if(isNaN(interaction.options._hoistedOptions[0].value) || isNaN(interaction.options._hoistedOptions[01].value)) {
            return interaction.reply('Both track positions need to be numbers!');
        }

        const firstTrackPosition = interaction.options._hoistedOptions[0].value - 1; 
        const secondTrackPosition = interaction.options._hoistedOptions[1].value - 1;
        await interaction.deferReply();

        try {
            if(queue.tracks.data[firstTrackPosition] && queue.tracks.data[secondTrackPosition]) {
                guildQueue.swap(queue.tracks.data[firstTrackPosition], queue.tracks.data[secondTrackPosition]);
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
                await interaction.editReply('Tracks swapped! New queue:\n');
                return interaction.followUp({ embeds: [queueEmbed] });
            } else {
                return interaction.followUp('Please provide two valid queue numbers.')
            }
        } catch(err) {
            console.log(err.stack);
            return interaction.followUp('Encountered an error while swapping tracks.');
        }
    }
}