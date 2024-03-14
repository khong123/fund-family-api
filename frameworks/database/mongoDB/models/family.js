import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FamilySchema = new Schema({
    name: {
        type: String
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    parentId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const FamilyModel = mongoose.model('Family', FamilySchema);

export default FamilyModel;

