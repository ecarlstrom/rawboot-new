//////////basic discord.js etc. dependencies and bot setup//////////
const { REST, Routes } = require('discord.js');
const  { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const { fileURLToPath } = require('node:url');
require('dotenv').config();

const intentTypes = [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMembers, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions
];
const client = new Client({ intents: intentTypes });
const CLIENT_ID = process.env.CLIENT_ID;
const token = process.env.TOKEN;

client.on('ready', () => {
    console.log("Logged in!");
});

client.login(token);

//////////command file management//////////
client.commands = new Collection();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('js'));

for(const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
        console.log("set", command.data.name);
    } else {
        console.log(`could not add ${command.data.name}`, console.error);
    }
}

client.on('interactionCreate', async interaction => {
    if(!interaction.isChatInputCommand()) return;

    // if(interaction.commandName === 'ping') {
    //     await interaction.reply('Pong!');
    // }

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
    console.log("content:", message);
    if(message.content.includes("pants")) {
        message.reply("PANTS");
    }
})