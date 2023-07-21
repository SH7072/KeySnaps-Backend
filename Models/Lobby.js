const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./User");

const lobbySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    lobbyCode: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        expires: 3600,
        default: Date.now,
    },

    isPublic: {
        type: Boolean,
        required: true,
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
