module.exports = {
	name: "ready",
	once: true,
	async execute(client) {
        try {
			// Login Message
			console.log(`Logged in as: ${client.user.tag}`);

			// Register Commands
			const registerCommands = require("../../scripts/register");
			await registerCommands();
		} catch(err) {
			client.logEventError(err);
		}
	}
}