module.exports = {
    name: "invite",
    description: "Sends the bot invite link",
    options: [],
    userPermissions: [],
    botPermissions: [],
    cooldown: 5,
    enabled: true,
    async execute(interaction, client, Discord) {
        try {
            const button = new Discord.ActionRowBuilder()
                .addComponents (
                    new Discord.ButtonBuilder()
                        .setStyle(Discord.ButtonStyle.Link)
                        .setLabel("Invite")
                        .setURL("https://wdh.gg/technobot")
                )

            await interaction.editReply({ components: [button] });
        } catch(err) {
            client.logCommandError(interaction, Discord);
        }
    }
}