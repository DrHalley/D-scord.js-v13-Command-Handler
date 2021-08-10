const mongoose = require('mongoose');
const GuildConfigSchema = new mongoose.Schema({
    guildId: {
        type: String,
        required: true,
        unique: true
    },
    prefix: {
        type: String,
        required: true,
        default: "//"
    },
    autoRoles: {
        type: Array,
        required: false
    },
    counterTarget: {
        type: Number,
        required: false
    },
    counterChannel: {
        type: String,
        required: false
    },
    badwordsStatus: {
        type: Boolean,
        required: false
    },
    adsStatus: {
        type: Boolean,
        required: false
    },
    spamStatus: {
        type: Boolean,
        required: false
    },
    capsStatus: {
        type: Boolean,
        required: false
    },
    badwords: {
        type: Array,
        required: false
    },
    autoAnswers: {
        type: Array,
        required: false
    },
    maleRole: {
        type: String,
        required: false
    },
    femaleRole: {
        type: String,
        required: false
    },
    registerRole: {
        type: String,
        required: false
    },
    unregisteredRole: {
        type: String,
        required: false
    },
    tag: {
        type: String,
        required: false
    },
    registerChannel: {
        type: String,
        required: false
    },
    registerStatus: {
        type: Boolean,
        required: false
    },
    supportChannel: {
        type: String,
        required: false
    },
    supportRole: {
        type: String,
        required: false
    },
    supportLog: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('GuildConfig', GuildConfigSchema);