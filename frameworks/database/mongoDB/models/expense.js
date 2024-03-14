import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    recordedAt: {
        type: Date,
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

const ExpenseModel = mongoose.model('Expense', ExpenseSchema);

export default ExpenseModel;

