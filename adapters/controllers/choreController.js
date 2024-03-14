import findAll from '../../application/use_cases/chore/findAll';
import countAll from '../../application/use_cases/chore/countAll';
import addChore from '../../application/use_cases/chore/add';
import findById from '../../application/use_cases/chore/findById';
import updateById from '../../application/use_cases/chore/updateById';
import deleteChore from '../../application/use_cases/chore/deleteById';

export default function choreController(
    choreDbRepository,
    choreDbRepositoryImpl
) {
    const dbRepository = choreDbRepository(choreDbRepositoryImpl());

    const fetchAllChores = (req, res, next) => {
        const userId = req.user.id;
        const familyId = req.query.familyId;
        const params = {};
        const response = {};

        for (const key in req.query) {
            if (Object.prototype.hasOwnProperty.call(req.query, key)) {
                params[key] = req.query[key];
            }
        }
        params.page = params.page ? parseInt(params.page, 10) : 1;
        params.perPage = params.perPage ? parseInt(params.perPage, 10) : 10;
        params.userId = userId;
        params.familyId = familyId;

        findAll({
            params: params,
            choreRepository: dbRepository
        })
            .then((chores) => {
                response.chores = chores;

                return countAll({
                    params: params,
                    choreRepository: dbRepository
                });
            })
            .then((totalItems) => {
                response.totalItems = totalItems;
                response.totalPages = Math.ceil(totalItems / params.perPage);
                response.itemsPerPage = params.perPage;

                return res.json(response);
            })
            .catch((error) => next(error));
    };

    const fetchChoreById = (req, res, next) => {
        findById({
            id: req.params.id,
            choreRepository: dbRepository
        })
            .then((chore) => {
                if (!chore) {
                    throw new Error('No chore found');
                }

                return res.json(chore);
            })
            .catch((error) => next(error));
    };

    const addNewChore = (req, res, next) => {
        const userId = req.user.id;
        const { description, rewardType, rewardValue, deadlineAt, completed, completedAt, childId, familyId } = req.body;

        addChore({
            description: description,
            rewardType: rewardType,
            rewardValue: rewardValue,
            deadlineAt: deadlineAt,
            completed: completed,
            completedAt: completedAt,
            childId: childId,
            userId: userId,
            familyId: familyId,
            choreRepository: dbRepository
        })
            .then((chore) => res.json(chore))
            .catch((error) => next(error));
    };

    const updateChoreById = (req, res, next) => {
        const { description, rewardType, rewardValue, deadlineAt, completed, completedAt, childId } = req.body;

        updateById({
            id: req.params.id,
            description: description,
            rewardType: rewardType,
            rewardValue: rewardValue,
            deadlineAt: deadlineAt,
            completed: completed,
            completedAt: completedAt,
            childId: childId,
            choreRepository: dbRepository
        })
            .then((chore) => res.json(chore))
            .catch((error) => next(error));
    };

    const deleteChoreById = (req, res, next) => {
        deleteChore({
            id: req.params.id,
            choreRepository: dbRepository
        })
            .then((chore) => res.json(chore))
            .catch((error) => next(error));
    };

    return {
        fetchAllChores,
        addNewChore,
        fetchChoreById,
        updateChoreById,
        deleteChoreById
    };
}
