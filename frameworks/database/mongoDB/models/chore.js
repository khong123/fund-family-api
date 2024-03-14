import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ChoreSchema = new Schema({
    description: {
        type: String
    },
    rewardType: {
        type: String,
        enum: ['monetary', 'points', 'privileges']
    },
    rewardValue: {
        type: Schema.Types.Mixed,
    },
    deadlineAt: {
        type: Date,
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Date,
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

const ChoreModel = mongoose.model('Chore', ChoreSchema);

export default ChoreModel;

