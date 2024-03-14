import updateById from '../../application/use_cases/family/updateById';

export default function familyController(
    familyDbRepository,
    familyDbRepositoryImpl
) {
    const dbRepository = familyDbRepository(familyDbRepositoryImpl());

    const updateFamilyById = (req, res, next) => {
        const { name } = req.body;

        updateById({
            id: req.params.id,
            name: name,
            familyRepository: dbRepository
        })
            .then((family) => res.json(family))
            .catch((error) => next(error));
    };

    return {
        updateFamilyById,
    };
}
