module.exports = {
    name: "reddit",
    description: "Sends a link to the r/Technoblade subreddit",
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
                        .setLabel("r/Technoblade")
                        .setURL("https://www.reddit.com/r/Technoblade")
                )

            await interaction.editReply({ components: [button] });
        } catch(err) {
            client.logCommandError(interaction, Discord);
        }
    }
}