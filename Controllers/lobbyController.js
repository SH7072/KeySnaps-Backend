const Session = require("../Models/Lobby");
const User = require("../Models/User");
const nanoid = require("nanoid-esm");

exports.createLobby = async (req, res, next) => {
    try {
        const { user_id } = req.params;
        const { isPublic } = req.body;
        const user = await User.findById(user_id);
        if (!user) {
            const error = new Error("Please Login as a valid user");
            error.statusCode = 404;
            throw error;
        }

        const sessionCode = nanoid.nanoid(5);
        const newSession = await Session.create({ user_id, sessionCode, isPublic });
        await newSession.save();
        res.status(200).json({
            message: "New Session Created",
            data: newSession,
        });
    } catch (error) {
        console.log(error);
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.joinLobby = async (req, res, next) => {
    try {
        const { sessionCode } = req.body;
        const session = await Session.findOne({ sessionCode: sessionCode });
        if (!session) {
            const error = new Error("Invalid Session Code ");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            message: "Session Found",
            data: session,
        });
    } catch (error) {
        console.log(error);
        if (!error.statusCode) {
            error.statusCode = 500;

        }
        next(error);
    }
}


// get all sessions which are public
exports.getAllPublicSessions = async (req, res, next) => {
    try {
        const sessions = await Session.find({ isPublic: true });
        res.status(200).json({
            message: "All Public Sessions",
            data: sessions,
        });
    } catch (error) {
        console.log(error);
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

