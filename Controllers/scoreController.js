const Score = require('../Models/Score');
const User = require('../Models/User');
const { signToken } = require('../Config/jwt');

// map through all the scores and prepare a list in decreasing order and send it as a response with user data
function extractValues(data) {
    return data.map((entry, index) => {
        const username = entry.user_id.username;
        const speed = entry.speed;
        const accuracy = entry.accuracy;
        const rank = index+1;

        return {
            username,
            speed,
            accuracy,
            rank: rank
        };
    });
}


exports.leaderBoard = async (req, res, next) => {
    try {
        const scores = await Score.find().sort({ speed: -1 }).populate({ path: "user_id", select: "username" });

        const results = extractValues(scores);
        
        
        res.status(200).json({
            message: "LeaderBoard",
            scores: results,
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


        const { userId, time, speed, accuracy } = req.body;
        console.log(userId);
        console.log(time, speed, accuracy);

        // const {token }=req.body;
        // const token = signToken({
        //     user_id: user._id,
        // });
        // console.log(user);

        const user = await User.findById(userId);
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        const newScore = await Score.create({
            user_id: userId,
            testDuration: time,
            speed: speed,
            accuracy: accuracy,
        });

        await newScore.save();
        // console.log(newScore);
        // console.log(newScore.id);

        // push new score id to user

        user.scores.push(newScore.id);
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