const Score = require('../Models/Score');
const User = require('../Models/User');
const { signToken } = require('../Config/jwt');

// map through all the scores and prepare a list in decreasing order and send it as a response with user data
exports.leaderBoard = async (req, res, next) => {
    try {
        const scores = await Score.find().sort({ speed: -1 });

        // for each score fetching user and sending user data with the score
        const leaderBoard = scores.map(async (score) => {
            const user = await User.findById(score.userId);
            return {
                name: user.name,
                speed: score.speed,
                accuracy: score.accuracy,
                totalTest: user.scores.length,
            };
        });
        res.status(200).json({
            message: "LeaderBoard",
            data: leaderBoard,
        });


    } catch (error) {
        console.log(error);
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.newScore = async (req, res, next) => {
    try {

        const { userId } = req.params;
        const { testDuration, speed, accuracy } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        const newScore = await Score.create({
            userId: userId,
            testDuration: testDuration,
            speed: speed,
            accuracy: accuracy,
        });

        await newScore.save();

        user.scores.push(newScore._id);
        await user.save();

        res.status(200).json({
            message: "New Score Added",
            data: newScore,
        });

    }
    catch (error) {
        console.log(error);
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}