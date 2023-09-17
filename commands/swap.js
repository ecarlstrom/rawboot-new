const { SlashCommandBuilder } = require('discord.js');
const { GuildQueuePlayerNode, useQueue } = require('discord-player');
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
        const { guild } = interaction;
        const queue = useQueue(guild.id);
        const guildQueue = new GuildQueuePlayerNode(queue);

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
            guildQueue.swap(queue.tracks.data[firstTrackPosition], queue.tracks.data[secondTrackPosition]);
            return interaction.followUp('Tracks swapped.');
        } catch(err) {
            console.log(err.stack);
            return interaction.followUp('Encountered an error while swapping tracks.');
        }
    }
}