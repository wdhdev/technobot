const emoji = require("../config.json").emojis;
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
    userPermissions: [],
    botPermissions: [],
    cooldown: 0,
    enabled: true,
    async execute(interaction, client, Discord) {
        try {
            const cmd = interaction.options.getString("command");

            const validPermissions = client.validPermissions;

            const cmds = [];

            const commandFiles = fs.readdirSync(`./src/commands/`).filter(file => file.endsWith(".js"));

            for(const file of commandFiles) {
                const command = require(`./${file}`);

                if(command.name) {
                    if(command.enabled === false) {
                        continue;
                    }

                    if(command.userPermissions.length) {
                        const invalidPerms = [];

                        for(const perm of command.userPermissions) {
                            if(!validPermissions.includes(perm)) {
                                continue;
                            }

                            if(!interaction.member?.permissions.has(perm)) {
                                invalidPerms.push(perm);
                            }
                        }

                        if(invalidPerms.length) {
                            continue;
                        }
                    }

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
                if(command.enabled === false) {
                    await interaction.editReply({ embeds: [help] });
                    return;
                }

                if(command.userPermissions.length) {
                    const invalidPerms = [];

                    for(const perm of command.userPermissions) {
                        if(!validPermissions.includes(perm)) {
                            continue;
                        }

                        if(!interaction.member?.permissions.has(perm)) {
                            invalidPerms.push(perm);
                        }
                    }

                    if(invalidPerms.length) {
                        await interaction.editReply({ embeds: [help] });
                        return;
                    }
                }

                let description = command.description;

                if(!description) {
                    description = "N/A";
                }

                let userPermissions = command.userPermissions;

                if(userPermissions !== []) {
                    userPermissions = `\`${userPermissions.join("\`, \`")}\``;
                } else {
                    userPermissions = "N/A";
                }

                if(userPermissions === "``") {
                    userPermissions = "N/A";
                }

                let botPermissions = command.botPermissions;

                if(botPermissions !== []) {
                    botPermissions = `\`${botPermissions.join("\`, \`")}\``;
                } else {
                    botPermissions = "N/A";
                }

                if(botPermissions === "``") {
                    botPermissions = "N/A";
                }

                let cooldown = command.cooldown;

                if(cooldown !== "") {
                    cooldown = `\`${command.cooldown}\` seconds`;
                }

                if(cooldown === "" || !cooldown) {
                    cooldown = "\`0\` seconds";
                }

                if(cooldown === "1") {
                    cooldown = "\`1\` second"
                }

                const commandHelp = new Discord.EmbedBuilder()
                    .setColor(client.config_embeds.default)
                    .addFields (
                        { name: "Command", value: `\`${command.name}\`` },
                        { name: "Description", value: description },
                        { name: "User Permissions", value: userPermissions },
                        { name: "Bot Permissions", value: botPermissions },
                        { name: "Cooldown", value: cooldown }
                    )
                    .setTimestamp()

                await interaction.editReply({ embeds: [commandHelp] });
                return;
            }

            await interaction.editReply({ embeds: [help] });
        } catch(err) {
            client.logCommandError(interaction, Discord);
        }
    }
}