import mongoose from 'mongoose';

const userContactSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        required: true
    },
    tags: [{
        type: String
    }]
}, {
    timestamps: true
});

const UserContact = mongoose.model('UserContact', userContactSchema);

export default UserContact;