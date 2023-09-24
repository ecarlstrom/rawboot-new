// const { SlashCommandBuilder } = require('discord.js');
// const { GuildQueuePlayerNode, useMainPlayer, useQueue } = require('discord-player');

// const filterNames = [
//     { name: "Bass Boost", value: "Bassboost" },
//     { name: "Chorus", value: "Chorus" },
//     { name: "Compressor", value: "Compressor" },
//     { name: "Dim", value: "Dim" },
//     { name: "Expander", value: "Expander" },
//     { name: "Fadein", value: "Fadein" },
//     { name: "Flanger", value: "Flanger" },
//     { name: "Gate", value: "Gate" },
//     { name: "Haas", value: "Haas" },
//     { name: "Karaoke", value: "Karaoke" },
//     { name: "Lofi", value: "Lofi" },
//     { name: "Mcompand", value: "Mcompand" },
//     { name: "Mono", value: "Mono" },
//     { name: "Nightcore", value: "Nightcore" },
//     { name: "Normalizer", value: "Normalizer" },
//     { name: "Phaser", value: "Phaser" },
//     { name: "Pulsator", value: "Pulsator" },
//     { name: "Reverse", value: "Reverse" },
//     { name: "Soft Limiter", value: "Softlimiter" },
//     { name: "Sub Boost", value: "Subboost" },
//     { name: "Surrounding", value: "Surrounding" },
//     { name: "Treble", value: "Treble" },
//     { name: "Vaporwave", value: "Vaporwave" },
//     { name: "Vibrato", value: "Vibrato"}
// ];

// let data = new SlashCommandBuilder()
//     .setName('filter')
//     .setDescription('Toggles, clears, or displays list of filters');

// data.addSubcommand(subcommand => 
//         subcommand.setName('clear')
//         .setDescription('Clears all applied filters'));
// data.addSubcommand(subcommand =>
//         subcommand.setName('show')
//         .setDescription('Shows a list of all filters, indicating active/inactive status'))
// data.addSubcommand(subcommand =>
//     subcommand.setName('toggle')
//     .setDescription('selects a filter to toggle on or off'))
//     .addStringOption(option =>
//         option.setName('name')
//         .setDescription('The name of the filter to apply'));
// console.log(data.options[2].options);

// // filterNames.forEach(name => {
// //     data.options[2].options[0].addChoices(name);
// // });

// let execute = async function(interaction) {
//     let input = interaction.options._hoistedOptions[0].value;
//     console.log("hello");
//     interaction.reply(`Input was ${input}`);
// }

// module.exports = {
//     data: data,
//     execute: execute
// };