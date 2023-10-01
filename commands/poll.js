const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const trumpblush = process.env.TRUMPBLUSH;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Creates a multiple choice poll')
        .addStringOption(option => 
            option.setName('question')
            .setDescription('Your very important question')
            .setRequired(true)
        .addChoices(
            { name: 'choice_a', value: 'A' },
            { name: 'choice_b', value: 'B' },
            { name: 'choice_c', value: 'C' },
            { name: 'choice_d', value: 'D' },
            { name: 'choice_e', value: 'E' }
        )),
    async execute(interaction) {
        var input = interaction.options._hoistedOptions[0].value;
        console.log("interaction:", interaction);
        const pollEmbed = new EmbedBuilder()
            .setColor(0x0006b1)
            .setTitle(`🤠 IT'S POLLIN' TIME 🤠`)
            .setDescription(`**${input}**`)
            .setThumbnail(trumpblush)
            .setFooter({ text: `Asked by ${interaction.member.nickname}` });
        
        
        var sent = await interaction.reply({ embeds: [pollEmbed], fetchReply: true });
    }
}