module.exports = async (client) => {
    const { REST, Routes } = require("discord.js");
    const fs = require("fs");

    require("dotenv").config();

    const clientId = process.env.clientId;

    let commands = [];

    const commandFiles = fs.readdirSync(`./src/commands/`).filter(file => file.endsWith(".js"));

    for(const file of commandFiles) {
        const command = require(`../commands/${file}`);

        commands.push(command);
    }

    const rest = new REST({ version: "9" }).setToken(process.env.token);

    (async () => {
        try {
            console.log("Registering slash commands...");

            const applicationCommands = await rest.put(Routes.applicationCommands(clientId), { body: commands });

            for(const command of applicationCommands) {
                console.log(`Registered Command: ${command.name}`);
            }

            console.log("Registered slash commands!");
        } catch(err) {
            console.error(err);
        }
    })();
}