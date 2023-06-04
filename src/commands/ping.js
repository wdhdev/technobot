const emoji = require("../config.json").emojis;

module.exports = {
	name: "ping",
	description: "Bot Latency",
    options: [],
    botPermissions: [],
    cooldown: 5,
    enabled: true,
	async execute(interaction, client, Discord) {
        try {
            const pinging = new Discord.EmbedBuilder()
                .setColor(client.config_embeds.default)
                .setDescription(`${emoji.pingpong} Pinging...`)

            const i = await interaction.editReply({ embeds: [pinging], fetchReply: true });

            const latency = i.createdTimestamp - interaction.createdTimestamp;
            const apiLatency = Math.round(client.ws.ping);

            const ping = new Discord.EmbedBuilder()
                .setColor(client.config_embeds.default)
                .addFields (
                    { name: "Latency", value: `${latency}ms` },
                    { name: "API Latency", value: `${apiLatency}ms` }
                )

            await interaction.editReply({ embeds: [ping] });
        } catch(err) {
            client.logCommandError(err, interaction, Discord);
        }
    }
}