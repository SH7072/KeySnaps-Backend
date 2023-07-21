const Lobby = require("../Models/Lobby");
const User = require("../Models/User");
const nanoid = require("nanoid-esm");

exports.createLobby = async (req, res, next) => {
    try {
        const { username, isPublic } = req.body;
        // const user = await User.findById(userId);
        // if (!user) {
        //     const error = new Error("Please Login as a valid user");
        //     error.statusCode = 404;
        //     throw error;
        // }

        const lobbyCode = nanoid(5);
        const newLobby = new Lobby({
            lobbyCode: lobbyCode,
            users: [username],
            ownerName: username,
            isPublic: isPublic,
        });
        await newLobby.save();

        res.status(200).json({
            message: "New Lobby Created",
            data: newLobby,
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
        const { username, lobbyCode } = req.body;
        // console.log(username, lobbyCode);
        const lobby = await Lobby.findOne({ lobbyCode: lobbyCode });
        if (!lobby) {
            const error = new Error("Invalid Lobby Code ");
            error.statusCode = 404;
            throw error;
        }

        const updatedLobby = await Lobby.findByIdAndUpdate(lobby._id,
            {
                $push: { users: username },
            },
            { new: true });


        res.status(200).json({
            message: "Lobby Found",
            data: updatedLobby,
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

exports.getLobby = async (req, res, next) => {
    try {
        const { id } = req.params;
        const lobby = await Lobby.find({ lobbyCode: id });
        if (!lobby) {
            const error = new Error("Invalid Lobby Code ");
            error.statusCode = 404;
            throw error;
        }

        console.log(lobby);
        res.status(200).json({
            message: "Lobby Found",
            data: lobby[0],
        });
    } catch (error) {
        console.log(error);
        if (!error.statusCode) {
            error.statusCode = 500;

        }
        next(error);
    }
}

