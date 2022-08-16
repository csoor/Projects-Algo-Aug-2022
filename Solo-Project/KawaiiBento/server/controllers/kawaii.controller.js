const KawaiiBento = require('../models/kawaii.model');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;
const User = require('../models/user.model')

module.exports = {
    getAllBento: (req, res) => {
        KawaiiBento.find({}).populate('createdBy', 'firstName lastName email')
        .then((allBento) => res.status(201).json(allBento))
        .catch((err) => {console.log('ERROR! Failed to find all Kawaii Bento Recipes', err)
        res.status(400).json({message: 'Oops! Something Went Wrong', error: err});
        });
    },
    getBentoById: (req, res) => {
        KawaiiBento.findOne({_id: req.params.id})
        .then((oneBento) => {res.status(201).json(oneBento)})
        .catch((err) => {console.log('ERROR! Failed to find Kawaii Bento by ID!', err)
        res.status(400).json({message: 'Oops! Something Went Wrong', error: err});
        });
    },
    createBento: (req, res) => {
        const user = jwt.verify(req.cookies.userToken, SECRET);
        KawaiiBento.create({...req.body, createdBy: user._id})
        .then((newBento) => res.status(201).json(newBento))
        .catch((err) => {console.log('ERROR! Cannot create Kawaii Bento', err);
        res.status(400).json({message: 'Oops! Something Went Wrong', error: err});
        });
    },
    deleteBento: (req, res) => {
        KawaiiBento.deleteOne({_id: req.params.id})
        .then((confirm) => {res.status(201).json(confirm)})
        .catch((err) => {console.log('ERROR! Failed to delete', err)
        res.status(400).json({message: 'Oops! Something Went Wrong', error: err});
        });
    },
    updateBento: (req, res) => {
        KawaiiBento.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
        .then((bento) => {res.status(201).json(bento)})
        .catch((err) => {console.log('ERROR! Failed to update', err)
        res.status(400).json({message: 'Oops! Something Went Wrong', error: err});
        });
    }
};

