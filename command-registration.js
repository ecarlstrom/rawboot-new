
require('dotenv').config();
const { REST, Routes } = require('discord.js');
const clientId  = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const token = process.env.TOKEN;
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandNames = fs.readdirSync(commandsPath);

const commandFiles = fs.readdirSync(`./commands/`).filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
    const command = require(`./commands/${file}`);

    if('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
    } else {
        console.log(`Failed to deply command ${filePath}`);
    }
}


const rest = new REST().setToken(token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
            /* use locally for now, will have to re-invite to all guilds with applications.commands permission -- also see about eventually running this file
            automatically when new commands are added */
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();