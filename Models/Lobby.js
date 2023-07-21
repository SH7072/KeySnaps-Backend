const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./User");

const lobbySchema = new mongoose.Schema({
    lobbyCode: {
        type: String,
        required: true,
    },
    users: [
        {
            type: String,
            required: true,
        }
    ],
    ownerName: {
        type: String,
        required: true,
    },
    isPublic: {
        type: Boolean,
        required: true,
    },
    lobbyStats: [
        {
            userName: {
                type: String,
                required: true,
            },
            speed: {
                type: Number,
                required: true,
            },
            accuracy: {
                type: Number,
                required: true,
            }
        }
    ],
    expired: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }

}, { timestamps: true });

// lobbySchema.pre('save', async function (next) {
//     const saltRounds = process.env.SALT_ROUNDS || 12
//     const lobby = this;
//     if (lobby.isModified('token')) {
//         lobby.token = await bcrypt.hash(lobby.token, saltRounds);
//     }
//     next();
// });

module.exports = mongoose.model("lobby", lobbySchema);
