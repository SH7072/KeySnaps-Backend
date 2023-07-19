const User = require('../Models/User');
const { signToken } = require('../Config/jwt');


exports.createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        console.log(name, email, password);
        await User.findOne({ email: email })
            .then(user => {
                if (user) {
                    const error = new Error("Email already Used. Please use a different email");
                    error.statusCode = 409;
                    throw error;
                }
            })
            .catch(err => {
                console.log(err);
                if (!err.statusCode) {
                    err.statusCode = 500;
                }

            });
        const newUser = await User.create({ name, email, password });
        await newUser.save();
        res.status(200).json({
            message: "User created",
            // userId: result,
            id: newUser._id,
            email: newUser.email,
        });
    }
    catch (err) {
        console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        if (!email) {
            const error = new Error("Email is Required");
            error.statusCode = 400;
            throw error;
        }
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error("Email not found");
            error.statusCode = 404;
            throw error;
        }
        const Match = await user.comparePassword(password);
        if (!Match) {
            const error = new Error("Incorrect Password");
            error.statusCode = 401;
            throw error;
        }
        const token = signToken({
            user_id: user._id,
        });
        res.status(200).json({
            message: 'user is loggedIn',
            token: token,
            userId: user._id,
        });
    }
    catch (err) {
        console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getUser = async (req, res, next) => {

    try {
        const { id } = req.params;
        const user = await User.findById(id);
            
        if (!user) {
            const error = new Error("User not found")
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: "user found",
            name: user.name,
            followers: user.followers.length,
            following: user.followings.length,
        })
    }
    catch (err) {
        console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}