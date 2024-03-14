import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const VerificationTokenSchema = new Schema({
    token: {
        type: String
    },
    type: {
        type: String,
        enum: ['email_verification', 'invite']
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    familyId: {
        type: Schema.Types.ObjectId,
        ref: 'Family'
    }
}, { timestamps: true });

const VerificationTokenModel = mongoose.model('VerificationToken', VerificationTokenSchema);

export default VerificationTokenModel;
