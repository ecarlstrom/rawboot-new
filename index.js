//////////basic discord.js etc. dependencies and bot setup//////////
const  { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();

const intentTypes = [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMembers, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent
];

const client = new Client({ intents: intentTypes });
const client_id = process.env.CLIENT_ID;
const token = process.env.TOKEN;

client.on('ready', () => {
    console.log("Logged in!");
});

client.login(token);

//////////command file management//////////
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('js'));

for(const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
        console.log(`set command '${command.data.name}'`);
    } else {
        console.log(`could not add ${command.data.name}`, console.error);
    }
}

client.on('interactionCreate', async interaction => {
    if(!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    if(!command) {
        console.error(`No ${interaction.commandName} command was found`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch(error) {
        console.error("error with command:", error);
        if(interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error executing this command!', ephemeral: true });
        }
    }
});

//////////message reaction rules (can probably move this into a neater format with another file)//////////
client.on('messageCreate', async message => {
    if(message.content.includes('tama') || message.author.id === process.env.tamaID) {
        message.react('👮');
    }
    if(message.content.toLowerCase().includes('kippy') || message.author.id === process.env.kippyID) {
        message.react('🐳');
        message.react('🐋');
    }
    if(message.author.id === process.env.samID) {
        message.react('🥜');
    }
    if(message.author.id === process.env.remyID) {
        message.react('💩');
    }
    if(message.author.id === process.env.jessID) {
        message.react('<:blobimfine:1037218991300677713>');
    }
    if(message.author.id === process.env.ktID) {
        message.react('<:ratblush:893330880335065169>');
    }
    if(message.author.id === process.env.loonaID) {
        message.react('<:please:1026653367394635966>');
    }
    if(message.author.id === process.env.usaaID) {
        message.react('<:blobnervouspleading:1036752418907639828>');
    }
})