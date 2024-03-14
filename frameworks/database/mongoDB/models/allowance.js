import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AllowanceSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly'],
        default: 'daily'
    },
    childId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
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

const AllowanceModel = mongoose.model('Allowance', AllowanceSchema);

export default AllowanceModel;

