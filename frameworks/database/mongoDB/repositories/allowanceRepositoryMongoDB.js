import AllowanceModel from '../models/allowance';
import { omit } from '../../../../utils/utils';

export default function allowanceRepositoryMongoDB() {
    const findAll = (params) =>
        AllowanceModel.find(omit(params, 'page', 'perPage'))
            .skip(params.perPage * params.page - params.perPage)
            .limit(params.perPage);

    const countAll = (params) =>
        AllowanceModel.countDocuments(omit(params, 'page', 'perPage'));

    const findById = (id) => AllowanceModel.findById(id);

    const add = (allowanceEntity) => {
        const newAllowance = new AllowanceModel({
            amount: allowanceEntity.getAmount(),
            frequency: allowanceEntity.getFrequency(),
            childId: allowanceEntity.getChildId(),
            userId: allowanceEntity.getUserId(),
            familyId: allowanceEntity.getFamilyId()
        });

        return newAllowance.save();
    };

    const updateById = (id, allowanceEntity, fieldsToUpdate) => {
        let updatedAllowance = {};

        if (fieldsToUpdate.includes('amount')) {
            updatedAllowance.amount = allowanceEntity.getAmount();
        }
        if (fieldsToUpdate.includes('frequency')) {
            updatedAllowance.frequency = allowanceEntity.getFrequency();
        }
        if (fieldsToUpdate.includes('childId')) {
            updatedAllowance.childId = allowanceEntity.getChildId();
        }

        if (Object.keys(updatedAllowance).length === 0) {
            return findById(id);
        }
        return AllowanceModel.findOneAndUpdate(
            { _id: id },
            { $set: updatedAllowance },
            { new: true }
        );
    };

    const deleteById = (id) => AllowanceModel.findByIdAndDelete(id);

    return {
        findAll,
        countAll,
        findById,
        add,
        updateById,
        deleteById
    };
}
