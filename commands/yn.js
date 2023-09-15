const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const yesNoImage = process.env.YES_NO_IMAGE;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('yn')
        .setDescription('Creates a simple yes/no poll')
        .addStringOption(option => 
            option.setName('question')
            .setDescription('A burning yes/no question you must have answered')
            .setRequired(true)),
    async execute(interaction) {
        var input = interaction.options._hoistedOptions[0].value;
        if(!input) {
            interaction.reply("PANTS");
        }

        const ynPollEmbed = new EmbedBuilder()
            .setColor(0x0006b1)
            .setTitle(`🤠 A POLL FOR YOU 🤠`)
            .setDescription(`**${input}**`)
            .setThumbnail(yesNoImage)
            .setFooter({ text: `Asked by ${interaction.member.nickname}` })

        var sent = await interaction.reply({ embeds: [ynPollEmbed], fetchReply: true });
        await sent.react('✅');
        await sent.react('⛔');
    }
}