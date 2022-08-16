const mongoose = require('mongoose');

const KawaiiBentoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required!'],
            minLength: [3, 'Title must be 3 characters long']
        },
        description: {
            type: String,
            require: [true, 'Please describe recipe'],
            maxLength: [200, 'Cannot be more than 200 characters long']
        },
        level: {
            type: String,
            required: [true, 'Must select difficulty level'],
            enum: ['Easy', 'Medium', 'Hard', 'Nightmare']
        },
        foodArt: {
            type: String,
            required: [true, 'Food image required PLEASE!']
        },
        ingredients: {
            type: String,
        },
        cookTime: {
            type: String,
            default: 'N/A'
        },
        servings: {
            type: Number,
            min: [1]
        },
        createdBy: {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {timestamps: true}
);

const Bento = mongoose.model('Bento', KawaiiBentoSchema);

module.exports = Bento;