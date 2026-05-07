const catchAsyncError = require('../middleware/catachAsyncError.js');
const User = require('../models/userModel.js');
const ErrorHandler = require('../utils/errorHandler.js');
const sendToken = require('../utils/sendToken.js');
const bcrypt = require('bcryptjs');

const register = catchAsyncError(async (req, res, next) => {

    const {
        name,
        email,
        password,
        role,
        phone
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return next(
            new ErrorHandler("User already exists", 400)
        );
    }

    const hash_password = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hash_password,
        role,
        phone
    });

    user.password = undefined;

    sendToken(user, 201, res);

});

const login = catchAsyncError(async (req, res, next) => {

    const {
        email,
        password
    } = req.body;

    if (!email || !password) {
        return next(
            new ErrorHandler(
                "Please enter email and password",
                400
            )
        );
    }

    const user = await User.findOne({ email });

    if (!user) {
        return next(
            new ErrorHandler(
                "Invalid email or password",
                401
            )
        );
    }

    const isPasswordMatched = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordMatched) {
        return next(
            new ErrorHandler(
                "Invalid email or password",
                401
            )
        );
    }

    user.lastLogin = new Date();

    await user.save();

    user.password = undefined;

    sendToken(user, 200, res);

});

module.exports = {
    register,
    login
};