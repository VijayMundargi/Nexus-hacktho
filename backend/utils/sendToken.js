const jwt = require('jsonwebtoken');

const sendToken = (
    user,
    statusCode,
    res
) => {

    const token = jwt.sign(

        {
            id: user._id,
            role: user.role,
        },

        process.env.JWT_SECRET,

        {
            expiresIn: '7d',
        }
    );


    const options = {

        expires: new Date(
            Date.now() +
            7 * 24 * 60 * 60 * 1000
        ),

        httpOnly: true,

        secure: false,

        sameSite: 'lax',
    };


    res
    .status(statusCode)
    .cookie(
        'token',
        token,
        options
    )
    .json({

        success: true,

        token,

        user,
    });
};

module.exports = sendToken;