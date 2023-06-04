const fs = require("fs");

module.exports = {
    name: "help",
    description: "Displays a list of all of my commands",
    options: [
        {
            type: 3,
            required: false,
            name: "command",
            description: "Get info on a specific command."
        }
    ],
    botPermissions: [],
    cooldown: 5,
    enabled: true,
    async execute(interaction, client, Discord) {
        try {
            const cmd = interaction.options.getString("command");

            const cmds = [];

            const commandFiles = fs.readdirSync(`./src/commands/`).filter(file => file.endsWith(".js"));

            for(const file of commandFiles) {
                const command = require(`./${file}`);

                if(command.name) {
                    if(!command.enabled) continue;

                    cmds.push(command.name);
                } else {
                    continue;
                }
            }

            const help = new Discord.EmbedBuilder()
                .setColor(client.config_embeds.default)
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ format: "png", dynamic: true }), url: `https://discord.com/users/${client.user.id}`})
                .setThumbnail(client.user.displayAvatarURL({ format: "png", dynamic: true }))
                .setTitle("Commands")
                .setDescription(`\`${cmds.join("\`, \`")}\``)
                .setTimestamp()

            const command = client.commands.get(cmd);

            if(command) {
                if(command.enabled === false) return await interaction.editReply({ embeds: [help] });

                const description = command.description ? command.description : "N/A";
                const botPermissions = command.botPermissions.length ? `\`${command.botPermissions.join("\`, \`")}\`` : "N/A";
                const cooldown = command.cooldown ? command.cooldown.length === 1 ? `\`${command.cooldown}\` second` : `${command.cooldown} seconds` : "None";

                const commandHelp = new Discord.EmbedBuilder()
                    .setColor(client.config_embeds.default)
                    .addFields (
                        { name: "Command", value: `\`${command.name}\`` },
                        { name: "Description", value: description },
                        { name: "Bot Permissions", value: botPermissions },
                        { name: "Cooldown", value: cooldown }
                    )
                    .setTimestamp()

                await interaction.editReply({ embeds: [commandHelp] });
                return;
            }

            await interaction.editReply({ embeds: [help] });
        } catch(err) {
            client.logCommandError(err, interaction, Discord);
        }
    }
}