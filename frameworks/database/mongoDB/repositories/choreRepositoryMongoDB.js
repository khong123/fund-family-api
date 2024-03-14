import ChoreModel from '../models/chore';
import { omit } from '../../../../utils/utils';

export default function choreRepositoryMongoDB() {
    const findAll = (params) =>
        ChoreModel.find(omit(params, 'page', 'perPage'))
            .skip(params.perPage * params.page - params.perPage)
            .limit(params.perPage);

    const countAll = (params) =>
        ChoreModel.countDocuments(omit(params, 'page', 'perPage'));

    const findById = (id) => ChoreModel.findById(id);

    const add = (choreEntity) => {
        const newChore = new ChoreModel({
            description: choreEntity.getDescription(),
            rewardType: choreEntity.getRewardType(),
            rewardValue: choreEntity.getRewardValue(),
            deadlineAt: choreEntity.getDeadlineAt(),
            completed: choreEntity.getCompleted(),
            completedAt: choreEntity.getCompletedAt(),
            childId: choreEntity.getChildId(),
            userId: choreEntity.getUserId(),
            familyId: choreEntity.getFamilyId()
        });

        return newChore.save();
    };

    const updateById = (id, choreEntity, fieldsToUpdate) => {
        let updatedChore = {};

        if (fieldsToUpdate.includes('description')) {
            updatedChore.description = choreEntity.getDescription();
        }
        if (fieldsToUpdate.includes('rewardType')) {
            updatedChore.rewardType = choreEntity.getRewardType();
        }
        if (fieldsToUpdate.includes('rewardValue')) {
            updatedChore.rewardValue = choreEntity.getRewardValue();
        }
        if (fieldsToUpdate.includes('deadlineAt')) {
            updatedChore.deadlineAt = choreEntity.getDeadlineAt();
        }
        if (fieldsToUpdate.includes('completed')) {
            updatedChore.completed = choreEntity.getCompleted();
        }
        if (fieldsToUpdate.includes('completedAt')) {
            updatedChore.completedAt = choreEntity.getCompletedAt();
        }
        if (fieldsToUpdate.includes('childId')) {
            updatedChore.childId = choreEntity.getChildId();
        }

        if (Object.keys(updatedChore).length === 0) {
            return findById(id);
        }
        return ChoreModel.findOneAndUpdate(
            { _id: id },
            { $set: updatedChore },
            { new: true }
        );
    };

    const deleteById = (id) => ChoreModel.findByIdAndDelete(id);

    return {
        findAll,
        countAll,
        findById,
        add,
        updateById,
        deleteById
    };
}
