const emoji = require("../config.json").emojis;

module.exports = {
	name: "ping",
    description: "Check the bot's latency.",
    options: [],
    botPermissions: [],
    cooldown: 5,
    enabled: true,
	async execute(interaction, client, Discord) {
        try {
            const botLatency = Date.now() - interaction.createdTimestamp;
            const apiLatency = Math.round(client.ws.ping);

            let botLatencyValue;
            let apiLatencyValue;

            if(botLatency >= 0 && botLatency <= 99) {
                botLatencyValue = `${emoji.connection_excellent} ${botLatency}ms`;
            } else if(botLatency >= 100 && botLatency <= 199) {
                botLatencyValue = `${emoji.connection_good} ${botLatency}ms`;
            } else {
                botLatencyValue = `${emoji.connection_bad} ${botLatency}ms`;
            }

            if(apiLatency >= 0 && apiLatency <= 99) {
                apiLatencyValue = `${emoji.connection_excellent} ${apiLatency}ms`;
            } else if(apiLatency >= 100 && apiLatency <= 199) {
                apiLatencyValue = `${emoji.connection_good} ${apiLatency}ms`;
            } else {
                apiLatencyValue = `${emoji.connection_bad} ${apiLatency}ms`;
            }

            const ping = new Discord.EmbedBuilder()
                .setColor(client.config_embeds.default)
                .addFields (
                    { name: "Bot Latency", value: botLatencyValue, inline: true },
                    { name: "API Latency", value: apiLatencyValue, inline: true }
                )

            await interaction.reply({ embeds: [ping] });
        } catch(err) {
            client.logCommandError(err, interaction, Discord);
        }
    }
}