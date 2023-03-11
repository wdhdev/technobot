const bot = require("../../package.json");

module.exports = {
    name: "bot-info",
    description: "Get information about the bot",
    options: [],
    userPermissions: [],
    botPermissions: [],
    cooldown: 5,
    enabled: true,
    async execute(interaction, client, Discord) {
        try {
            let totalSeconds = (client.uptime / 1000);
            let days = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400; 
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.floor(totalSeconds % 60);

            let uptime_days = `\`${days}\` days`;
            let uptime_hours = `\`${hours}\` hours`;
            let uptime_minutes = `\`${minutes}\` minutes`;
            let uptime_seconds = `\`${seconds}\` seconds`;

            if(days === 1) {
                uptime_days = `\`${days}\` day`;
            }

            if(hours === 1) {
                uptime_hours = `\`${hours}\` hour`;
            }

            if(minutes === 1) {
                uptime_minutes = `\`${minutes}\` minute`;
            }

            if(seconds === 1) {
                uptime_seconds = `\`${seconds}\` second`;
            }

            let uptime = `${uptime_days}, ${uptime_hours}, ${uptime_minutes}, ${uptime_seconds}`;

            const info = new Discord.EmbedBuilder()
                .setColor(client.config_embeds.default)
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ format: "png", dynamic: true }), url: `https://discord.com/users/${client.user.id}`})
                .setThumbnail(client.user.displayAvatarURL({ format: "png", dynamic: true }))
                .setTitle("Bot Information")
                .addFields (
                    { name: "Name", value: client.user.username },
                    { name: "ID", value: `\`${client.user.id}\`` },
                    { name: "Version", value: `\`${bot.version}\`` },
                    { name: "Developer", value: bot.author },
                    { name: "Uptime", value: uptime },
                    { name: "Guilds", value: `\`${client.guilds.cache.size}\`` },
                    { name: "Users", value: `\`${client.users.cache.size}\`` }
                )

            const githubBtn = new Discord.ActionRowBuilder()
                .addComponents (
                    new Discord.ButtonBuilder()
                        .setStyle(Discord.ButtonStyle.Link)
                        .setLabel("GitHub")
                        .setURL("https://wdh.gg/technobot-github")
                )

            await interaction.editReply({ embeds: [info], components: [githubBtn] });
        } catch(err) {
            client.logCommandError(interaction, Discord);
        }
    }
}
