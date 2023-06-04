module.exports = (client) => {
    const loadCommands = require("../helpers/loadCommands");

    loadCommands(client);

    const emoji = require("../config.json").emojis;
    const Sentry = require("@sentry/node");

    client.logCommandError = async function(err, interaction, Discord) {
        Sentry.captureException(err);

        const error = new Discord.EmbedBuilder()
            .setColor(client.config_embeds.error)
            .setDescription(`${emoji.error} An error occurred!`)

        await interaction.editReply({ embeds: [error], ephemeral: true });
    }

    require("dotenv").config();
}