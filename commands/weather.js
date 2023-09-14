const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const weather = require('weather-js');

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
        await interaction.deferReply();
        /* tomorrow: clean up all the data[0] crap with a variable, 
        can also try offering a choice if multiple locations? e.g. 07054 being nj or laos,
        zip code should give town/state/country etc. rather than zip/country format */
        // yes, setTimeout is a bad solution, using it as a placeholder to stabilize this for now
        setTimeout(function() {
            weather.find({ search: location, degreeType: 'C' }, function(err, data) {
                // needs more async here, maybe
                if(err) {
                    console.log("error retrieving weather:", location, err.stack);
                    interaction.editReply({ content: 'THERE WAS AN ERROR BUT AT LEAST I DIDN\'T CRASH' });
                } else {
                    if(!data || data.length == 0) {
                        interaction.editReply({ content: `No weather data for '${location}', try another location!` });
                    } else {
                        function toF(temp) {
                            return Math.ceil((temp * 9/5) + 32); 
                        }

                        // change sidebar color based on temperature
                        var sidebarColor;
                        if(toF(data[0].current.temperature) >= 85) {
                            sidebarColor = 0xFF0000;
                        } else if(toF(data[0].current.temperature) >= 50 && toF(data[0].current.temperature) <= 84) {
                            sidebarColor = 0x8FFF00;
                        } else if(toF(data[0].current.temperature) < 50) {
                            sidebarColor = 0xB0FFFA;
                        }
                        async function generateEmbed() {
                            var lowercaseText = data[0].current.skytext.toLowerCase();
                            var formattedText = lowercaseText.charAt(0).toUpperCase() + lowercaseText.slice(1);
                            const weatherEmbed = new EmbedBuilder()
                            .setColor(sidebarColor)
                            .setTitle(`🤠 Current weather for ${data[0].current.observationpoint} 🤠`)
                            .setDescription(`${formattedText} right now.`)
                            // add back the embed sidebar color coding based on temperature, icon based on main
                            .addFields({ name: '🌡️ Current Temperature', value: `**${Math.ceil(data[0].current.temperature)}° C / ${toF(data[0].current.temperature)}° F**` })
                            .addFields({ name: '🧍 Feels Like', value: `**${Math.ceil(data[0].current.feelslike)}° C / ${toF(data[0].current.feelslike)}° F**` })
                            .addFields({ name: '💨 Wind Speed', value: `**${data[0].current.winddisplay}**` })
                            .addFields({ name: '💦 Humidity', value: `**${data[0].current.humidity}%**` })
                            .setThumbnail(data[0].current.imageUrl)
                            .setFooter({ text: '🧙 I think I have fixed all timeout errors with the magic of async, please let me know if I am wrong' })
                            await interaction.editReply({ embeds: [weatherEmbed] });
                        }

                        generateEmbed();
                    }
                }
            });
        }, 1000);
    }
}