try {
    const fs = require("fs");

    module.exports = async (client) => {
        const commandFiles = fs.readdirSync(`./src/commands/`).filter(file => file.endsWith(".js"));

        for(const file of commandFiles) {
            const command = require(`../commands/${file}`);

            client.commands.set(command.name, command);

            console.log(`Loaded Command: ${command.name}`);
        }
    }
} catch(err) {
    const Sentry = require("@sentry/node");

    Sentry.captureException(err);
    console.error(err);
}