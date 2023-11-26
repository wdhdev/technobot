const { exec } = require("child_process");

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

            // Automatic Git Pull
            setInterval(() => {
                exec("git pull", (err, stdout) => {
                    if(err) return console.log(err);
                    if(stdout.includes("Already up to date.")) return;

                    console.log(stdout);
                    process.exit();
                })
            }, 30 * 1000) // 30 seconds
		} catch(err) {
			client.logEventError(err);
		}
	}
}