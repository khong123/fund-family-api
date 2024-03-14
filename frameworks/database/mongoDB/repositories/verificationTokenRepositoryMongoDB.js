import VerificationTokenModel from '../models/verificationToken';

export default function verificationTokenRepositoryMongoDB() {
    const findAll = (params) => VerificationTokenModel.find(params);

    const findById = (id) => VerificationTokenModel.findById(id);

    const add = (verificationTokenEntity) => {
        const newVerificationToken = new VerificationTokenModel({
            token: verificationTokenEntity.getToken(),
            type: verificationTokenEntity.getType(),
            userId: verificationTokenEntity.getUserId(),
            familyId: verificationTokenEntity.getFamilyId()
        });

        return newVerificationToken.save();
    };

    const deleteById = (id) => VerificationTokenModel.findByIdAndDelete(id);

    return {
        findAll,
        findById,
        add,
        deleteById
    };
}
