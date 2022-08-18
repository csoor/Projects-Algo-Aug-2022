const User =  require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

const Register = async (req, res) => {
    try {
        // console.log('Something', req.body)
        const user = await User(req.body);
        // console.log('Something2')
        const newUser = await user.save();
        console.log('User Created!!', newUser);
        const userToken = jwt.sign(
            {_id: newUser._id, firstName: newUser.firstName, lastName: newUser.lastName, email: newUser.email}, SECRET,
        );
        console.log('JWT:', userToken);
        res
            .status(201)
            .cookie('userToken', userToken,{httOnly: true, expires: new Date(Date.now() + 900000)})
            .json({successMessage: 'User Created!', user: newUser});

    } catch (error) {
        console.log('Register ERROR!!!', error);
        res.status(400).json(error);
    }
};

const Login = async (req, res) => {
    const userDoc = await User.findOne({email: req.body.email});
    console.log('USERDOC', userDoc);
    if(!userDoc) {
        res.status(400).json({error: 'Invalid Email/Password'});
    } else {
        try {
            const isPasswordValid = await bcrypt.compare(req.body.password, userDoc.password);
            if(!isPasswordValid) {
                res.status(400).json({error: 'Invalid Email/Password'})
            } else {
                const userToken = jwt.sign(
                    {_id: userDoc._id, email: userDoc.email, firstName: userDoc.firstName, lastName: userDoc.lastName}, SECRET,
                );
                console.log('JWT:', userToken);
                res
                    .status(201)
                    .cookie('userToken', userToken,{httOnly: true, expires: new Date(Date.now() + 900000)})
                    .json({successMessage: 'User Logged in!', user: userDoc});
            }
        } catch (error) {
            console.log('Login ERROR!!!', error);
            res.status(400).json({error: 'Invalid Email/Password'})
        }
    }
};

const Logout = (req, res) => {
    res.clearCookie('userToken')
    res.json({successMessage: 'User Logged Out successfully'})
};

const getLoggedInUser = async (req, res) => {
    console.log('WHY!!!!')
    console.log('TOKEN', req.cookies);
    const user = jwt.verify(req.cookies.userToken, SECRET);
    console.log('WHY MUST YOU BE NULL')
    User.findOne({_id: user._id})
        .then((user) => {res.json(user);})
        .catch((err) => {console.log(err);})
}

module.exports = {
    Register,
    Login,
    Logout,
    getLoggedInUser
}