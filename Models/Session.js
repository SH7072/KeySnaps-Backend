const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./User");

const sessionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    sessionCode: {
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
sessionSchema.pre('save', async function (next) {
    const saltRounds = process.env.SALT_ROUNDS || 12
    const session = this;
    if (session.isModified('token')) {
        session.token = await bcrypt.hash(session.token, saltRounds);
    }
    next();
});
module.exports = mongoose.model("Session", sessionSchema);
