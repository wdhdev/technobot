const emoji = require("../../config.json").emojis;

const cooldowns = new Map();

module.exports = {
	name: "interactionCreate",
	async execute(client, Discord, interaction) {
        try {
            const requiredPerms = ["SendMessages", "EmbedLinks"];

            if(!interaction.guild.members.me.permissions.has(requiredPerms)) return;

            if(!interaction.type === Discord.InteractionType.ApplicationCommand) return;

            const command = client.commands.get(interaction.commandName);

            if(!command) return;

            await interaction.deferReply();

            if(command.enabled === false) {
                const commandDisabled = new Discord.EmbedBuilder()
                    .setColor(client.config_embeds.error)
                    .setDescription(`${emoji.error} This command has been disabled!`)

                await interaction.editReply({ embeds: [commandDisabled] });
                return;
            }

            const validPermissions = client.validPermissions;

            if(command.botPermissions.length) {
                const invalidPerms = [];

                for(const perm of command.botPermissions) {
                    if(!validPermissions.includes(perm)) {
                        return;
                    }

                    if(!interaction.guild.members.me.permissions.has(perm)) {
                        invalidPerms.push(perm);
                    }
                }

                if(invalidPerms.length) {
                    const permError = new Discord.EmbedBuilder()
                        .setColor(client.config_embeds.error)
                        .setDescription(`I am missing these permissions: \`${invalidPerms.join("\`, \`")}\``)

                    await interaction.editReply({ embeds: [permError] });
                    return;
                }
            }

            if(!cooldowns.has(command.name)) {
                cooldowns.set(command.name, new Discord.Collection());
            }

            const currentTime = Date.now();
            const timeStamps = cooldowns.get(command.name);
            const cooldownAmount = command.cooldown * 1000;

            if(timeStamps.has(interaction.member.id)) {
                const expirationTime = timeStamps.get(interaction.member.id) + cooldownAmount;

                if(currentTime < expirationTime) {
                    const timeLeft = (expirationTime - currentTime) / 1000;

                    if(timeLeft.toFixed(0) > 1 || timeLeft.toFixed(0) < 1) {
                        const cooldown = new Discord.EmbedBuilder()
                            .setColor(client.config_embeds.error)
                            .setDescription(`${emoji.error} Please wait \`${timeLeft.toFixed(0)}\` seconds before running that command again!`)

                        await interaction.editReply({ embeds: [cooldown] });
                        return;
                    }

                    if(timeLeft.toFixed(0) < 2) {
                        const cooldown = new Discord.EmbedBuilder()
                            .setColor(client.config_embeds.error)
                            .setDescription(`${emoji.error} Please wait \`${timeLeft.toFixed(0)}\` second before running that command again!`)

                        await interaction.editReply({ embeds: [cooldown] });
                        return;
                    }
                }
            }

            timeStamps.set(interaction.member.id, currentTime);

            setTimeout(() => {
                timeStamps.delete(interaction.member.id);
            }, cooldownAmount)

            try {
                await command.execute(interaction, client, Discord);
            } catch(err) {
                client.logEventError(interaction, Discord);
            }
        } catch(err) {
            console.error(err);
        }
    }
}