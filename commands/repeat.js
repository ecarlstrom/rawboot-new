const { SlashCommandBuilder } = require('discord.js');
const { GuildQueuePlayerNode, useQueue, GuildQueueAudioFilters, QueueRepeatMode } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('repeat')
        .setDescription('Sets the repeat mode for current playback')
        .addIntegerOption(option =>
            option.setName('mode')
                .setDescription('The repeat mode to use')
                .addChoices(
                    { name: 'Off', value: 0 },
                    { name: 'Track', value: 1 },
                    { name: 'Queue', value: 2 },
                    { name: 'Autoplay', value: 3 }
            )),
    async execute(interaction) {
        const { guild } = interaction;
        const input = interaction.options._hoistedOptions[0].value;
        console.log("input is", interaction.options);
        const channel = interaction.member.voice.channel;
        const queue = useQueue(guild.id);
        const guildQueue = new GuildQueuePlayerNode(queue);
        console.log('interaction info:', interaction.options._hoistedOptions[0].value);
        if (!channel) {
            return interaction.reply('HEY TOP! STILL! JOIN A VOICE CHANNEL!');
        } 
        
        if(!queue || !guildQueue) {
            return interaction.reply('No song currently playing.')
        }

        await interaction.deferReply();

        try {
            // const mode = input.toUpperCase();
            // console.log("mode is ", mode);
            QueueRepeatMode.TRACK = 1;
            return interaction.followUp(`Repeat mode set to ${input}.`);
        } catch (err) {
            return interaction.followUp(`Error setting repeat mode: ${err.stack}`);
        }
    }
}