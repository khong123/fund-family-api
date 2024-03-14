import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BudgetSchema = new Schema({
    budgetLimit: {
        type: Number,
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
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

const BudgetModel = mongoose.model('Budget', BudgetSchema);

export default BudgetModel;

