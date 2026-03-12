const { REST, Routes } = require('discord.js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(commandsPath);

// ប្រមូល commands ទាំងអស់
for (const folder of commandFolders) {
    const folderPath = path.join(commandsPath, folder);
    const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
    
    for (const file of commandFiles) {
        const filePath = path.join(folderPath, file);
        const command = require(filePath);
        
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
            console.log(`📦 បានបន្ថែម command: ${command.data.name}`);
        }
    }
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// Deploy commands
(async () => {
    try {
        console.log(`🔄 កំពុងចាប់ផ្តើម refresh ${commands.length} commands...`);

        // សម្រាប់ development (guild specific - លឿនជាង)
        if (process.env.GUILD_ID) {
            const data = await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
                { body: commands },
            );
            console.log(`✅ បានដាក់ ${data.length} commands សម្រាប់ guild ${process.env.GUILD_ID}`);
        }
        
        // សម្រាប់ production (global - យឺតបន្តិចប៉ុន្តែធ្វើការគ្រប់សឺវើរ)
        const globalData = await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands },
        );
        console.log(`✅ បានដាក់ ${globalData.length} commands សម្រាប់ទូទាំងពិភពលោក`);

    } catch (error) {
        console.error('❌ មានបញ្ហា:', error);
    }
})();