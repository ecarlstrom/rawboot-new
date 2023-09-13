const { match } = require('assert');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const weather = require('weather-js');
const weatherKey = process.env.WEATHER_API_KEY;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('Provides current weather conditions for the provided city or ZIP code')
        .addStringOption(option => 
            option.setName('location')
            .setDescription('Location in which to look up weather data')
            .setRequired(true)),
    async execute(interaction) {
        // there must be a more succinct way to get input
        var location = interaction.options._hoistedOptions[0].value;
        // tomorrow: clean up all the data[0] crap with a variable
        weather.find({ search: location, degreeType: 'C' }, function(err, data) {
            if(err) {
                console.log('error retrieving weather:', err.stack);
            } else {
                if(!data || data.length == 0) {
                    interaction.reply({ content: `No weather data for ${location}, try another location!` });
                } else {
                    console.log("data:", data);
                    function toF(temp) {
                        return Math.ceil((temp * 9/5) + 32); 
                    }
                    const weatherEmbed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle(`🤠 Current weather for ${data[0].location.name} 🤠`)
                    .setDescription(`It is ${data[0].current.skytext.toLowerCase()} right now.`)
                    // yes, this formatting looks horrendous
                    // add back the embed sidebar color coding based on temperature, icon based on main
                    .addFields({ name: 'Current Temperature', value: `**${Math.ceil(data[0].current.temperature)}° C / ${toF(data[0].current.temperature)}° F**` })
                    .addFields({ name: 'Feels Like', value: `**${Math.ceil(data[0].current.feelslike)}° C / ${toF(data[0].current.feelslike)}° F**` })
                    .addFields({ name: 'Wind Speed', value: `**${data[0].current.winddisplay}**` })
                    .setThumbnail(data[0].current.imageUrl)
                    .setFooter({ text: 'Forecast command will be coming soon :CatBlush:' })

                    interaction.reply({ embeds: [weatherEmbed] });
                }
            }
        });
    }
}