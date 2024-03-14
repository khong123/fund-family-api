import findAll from '../../application/use_cases/allowance/findAll';
import countAll from '../../application/use_cases/allowance/countAll';
import addAllowance from '../../application/use_cases/allowance/add';
import findById from '../../application/use_cases/allowance/findById';
import updateById from '../../application/use_cases/allowance/updateById';
import deleteAllowance from '../../application/use_cases/allowance/deleteById';

export default function allowanceController(
    allowanceDbRepository,
    allowanceDbRepositoryImpl
) {
    const dbRepository = allowanceDbRepository(allowanceDbRepositoryImpl());

    const fetchAllAllowances = (req, res, next) => {
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
            allowanceRepository: dbRepository
        })
            .then((allowances) => {
                response.allowances = allowances;

                return countAll({
                    params: params,
                    allowanceRepository: dbRepository
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

    const fetchAllowanceById = (req, res, next) => {
        findById({
            id: req.params.id,
            allowanceRepository: dbRepository
        })
            .then((allowance) => {
                if (!allowance) {
                    throw new Error('No allowance found');
                }

                return res.json(allowance);
            })
            .catch((error) => next(error));
    };

    const addNewAllowance = (req, res, next) => {
        const userId = req.user.id;
        const { amount, frequency, childId, familyId } = req.body;

        addAllowance({
            amount: amount,
            frequency: frequency,
            childId: childId,
            userId: userId,
            familyId: familyId,
            allowanceRepository: dbRepository
        })
            .then((allowance) => res.json(allowance))
            .catch((error) => next(error));
    };

    const updateAllowanceById = (req, res, next) => {
        const { amount, frequency, childId } = req.body;

        updateById({
            id: req.params.id,
            amount: amount,
            frequency: frequency,
            childId: childId,
            allowanceRepository: dbRepository
        })
            .then((allowance) => res.json(allowance))
            .catch((error) => next(error));
    };

    const deleteAllowanceById = (req, res, next) => {
        deleteAllowance({
            id: req.params.id,
            allowanceRepository: dbRepository
        })
            .then((allowance) => res.json(allowance))
            .catch((error) => next(error));
    };

    return {
        fetchAllAllowances,
        addNewAllowance,
        fetchAllowanceById,
        updateAllowanceById,
        deleteAllowanceById
    };
}
