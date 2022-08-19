const User =  require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

const Register = async (req, res) => {
    try {
        const user = await User(req.body);
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
    // const userDoc = await User.findOne({email: req.body.email});
    // console.log('USERDOC', userDoc);
    // if(!userDoc) {
    //     res.status(400).json({error: 'Invalid Email/Password'});
    // } else {
    //     try {
    //         const isPasswordValid = await bcrypt.compare(req.body.password, userDoc.password);
    //         if(!isPasswordValid) {
    //             res.status(400).json({error: 'Invalid Email/Password'})
    //         } else {
    //             const userToken = jwt.sign(
    //                 {_id: userDoc._id, email: userDoc.email, firstName: userDoc.firstName, lastName: userDoc.lastName}, SECRET,
    //             );
    //             console.log('JWT:', userToken);
    //             res
    //                 .status(201)
    //                 .cookie('userToken', userToken,{httOnly: true, expires: new Date(Date.now() + 900000)})
    //                 .json({successMessage: 'User Logged in!', user: userDoc});
    //         }
    //     } catch (error) {
    //         console.log('Login ERROR!!!', error);
    //         res.status(400).json({error: 'Invalid Email/Password'})
    //     }
    // }


    const { body} = req;
    if(!body.email) {
        res.status(400).json({error: 'No Email Provided! - Please Provide Email'});
        return;
    }
    let userQuery;

    try {
        userQuery = await User.findOne({email: body.email});
        if (userQuery === null) {
            res.status(400).json({msg: 'Email Not Found!'});
        }
    } catch (error) {
        res.status(400).json(error);
    }

    const passwordCheck = bcrypt.compareSync(body.password, userQuery.password)
    if(!passwordCheck) {
        res.status(400).json({error: 'Email and Password do not match!'})
    }

    const userToken = jwt.sign({_id: userQuery._id}, 'pholicious');
    console.log(userToken);

    res.cookie('userToken', userToken, 'pholicious', {
        httpOnly: true,
        expires: new Date(Date.now()+ 900000000)
    })
    .json({msg: 'Successful Login!'})
};

const Logout = (req, res) => {
    res.clearCookie('userToken')
    res.json({successMessage: 'User Logged Out Successfully'})
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