const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const scoreSchema = new mongoose.Schema({
    speed: {
        type: Number,
        required: true
    },
    accuracy: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    testDuration: {
        type: Number,
        required: true,
    }
}, { timestamps: true })

module.exports = mongoose.model('Score', scoreSchema);
