module.exports = (client, Discord) => {
    const loadEvents = require("../helpers/loadEvents");

    loadEvents(client, Discord);

    const emoji = require("../config.json").emojis;

    client.logEventError = async function(interaction, Discord) {
        const error = new Discord.EmbedBuilder()
            .setColor(client.config_embeds.error)
            .setDescription(`${emoji.error} There was an error while executing that command!`)

        await interaction.editReply({ embeds: [error] });
    }

    require("dotenv").config();
}