import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    relationship: {
        type: String,
        enum: ['parent', 'child', 'spouse', 'other']
    },
    accountType: {
        type: String,
        enum: ['parent', 'family_member'],
        default: 'family_member',
    },
    families: [{
        type: Schema.Types.ObjectId,
        ref: 'Family'
    }],
}, { timestamps: true });

UserSchema.methods.toJSON = function () {
    const userObject = this.toObject();

    delete userObject.password;

    return userObject;
};

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;

