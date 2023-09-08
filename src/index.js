const Sentry = require("@sentry/node");

require("dotenv").config();

Sentry.init({
    dsn: process.env.sentry_dsn,
    tracesSampleRate: 1.0
})

const config = require("./config.json");

const Discord = require("discord.js");
const client = new Discord.Client({
    intents: 3276799,
    presence: {
        activities: [
            {
                name: "wdh.gg/technobot",
                type: Discord.ActivityType.Custom
            }
        ],
        status: "online"
    }
})

// Error Handling
client.on("error", (err) => {
    Sentry.captureException(err);
    console.error(err);
})

client.on("warn", (warn) => {
    Sentry.captureMessage(warn);
    console.warn(warn);
})

process.on("unhandledRejection", (err) => {
    Sentry.captureException(err);
    console.error(err);
})

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
client.sentry = Sentry;

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
    "ModerateMembers",
    "ViewCreatorMonetizationAnalytics",
    "UseSoundboard",
    "SendVoiceMessages"
]