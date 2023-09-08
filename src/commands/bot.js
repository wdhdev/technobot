const bot = require("../../package.json");

module.exports = {
    name: "bot",
    description: "Get information about the bot.",
    options: [],
    botPermissions: [],
    cooldown: 5,
    enabled: true,
    async execute(interaction, client, Discord) {
        try {
            const info = new Discord.EmbedBuilder()
                .setColor(client.config_embeds.default)
                .setAuthor({ name: client.user.tag.endsWith("#0") ? client.user.username : client.user.tag, iconURL: client.user.displayAvatarURL({ extension: "png", forceStatic: false }), url: `https://discord.com/users/${client.user.id}` })
                .setDescription(bot.description)
                .addFields (
                    { name: "📈 Version", value: bot.version, inline: true },
                    { name: "🟢 Online Since", value: `<t:${(Date.now() - client.uptime).toString().slice(0, -3)}:f>`, inline: true }
                )

            await interaction.editReply({ embeds: [info] });

            const buttons = new Discord.ActionRowBuilder()
                .addComponents (
                    new Discord.ButtonBuilder()
                        .setStyle(Discord.ButtonStyle.Link)
                        .setLabel("GitHub")
                        .setURL("https://wdh.gg/technobot-github")
                )

            await interaction.editReply({ embeds: [info], components: [buttons] });
        } catch(err) {
            client.logCommandError(err, interaction, Discord);
        }
    }
}
