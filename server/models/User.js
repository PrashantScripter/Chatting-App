const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female']
    },
    profilePhoto: {
        type: String,
        default: function () {
            return this.gender === 'Male'
                ? 'https://avatar.iran.liara.run/public/boy'
                : 'https://avatar.iran.liara.run/public/girl';
        }
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
