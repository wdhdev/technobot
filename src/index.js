const config = require("./config.json");

const Discord = require("discord.js");
const client = new Discord.Client({
    intents: 3276799,
    presence: {
        activities: [
            {
                name: config.presence.activity,
                type: config.presence.activityType,
            }
        ],

        status: config.presence.status
    }
})

// Debug
client.on("debug", info => {
    console.log(`[Debug] ${info}`);
})

// Error Handling
client.on("error", () => console.error);
client.on("warn", () => console.warn);
process.on("unhandledRejection", console.error);

require("dotenv").config();

// Configs
client.config_embeds = config.embeds;
client.config_emojis = config.emojis;
client.config_presence = config.presence;

// Command Handlers
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

["command", "event"].forEach(handler => {
    require(`./handlers/${handler}`) (client, Discord);
})

// Login
client.login(process.env.token);

// Global
client.validPermissions = [
    "CreateInstantInvite",
    "KickMembers",
    "BanMembers",
    "Administrator",
    "ManageChannels",
    "ManageGuild",
    "AddReactions",
    "ViewAuditLog",
    "PrioritySpeaker",
    "Stream",
    "ViewChannel",
    "SendMessages",
    "SendTTSMessages",
    "ManageMessages",
    "EmbedLinks",
    "AttachFiles",
    "ReadMessageHistory",
    "MentionEveryone",
    "UseExternalEmojis",
    "ViewGuildInsights",
    "Connect",
    "Speak",
    "MuteMembers",
    "DeafenMembers",
    "MoveMembers",
    "UseVAD",
    "ChangeNickname",
    "ManageNicknames",
    "ManageRoles",
    "ManageWebhooks",
    "ManageEmojisAndStickers",
    "UseApplicationCommands",
    "RequestToSpeak",
    "ManageEvents",
    "ManageThreads",
    "CreatePublicThreads",
    "CreatePrivateThreads",
    "UseExternalStickers",
    "SendMessagesInThreads",
    "UseEmbeddedActivities",
    "ModerateMembers"
]