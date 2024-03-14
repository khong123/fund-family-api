import findAll from '../../application/use_cases/budget/findAll';
import countAll from '../../application/use_cases/budget/countAll';
import addBudget from '../../application/use_cases/budget/add';
import findById from '../../application/use_cases/budget/findById';
import updateById from '../../application/use_cases/budget/updateById';
import deleteBudget from '../../application/use_cases/budget/deleteById';

export default function budgetController(
    budgetDbRepository,
    budgetDbRepositoryImpl
) {
    const dbRepository = budgetDbRepository(budgetDbRepositoryImpl());

    const fetchAllBudgets = (req, res, next) => {
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
            budgetRepository: dbRepository
        })
            .then((budgets) => {
                response.budgets = budgets;

                return countAll({
                    params: params,
                    budgetRepository: dbRepository
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

    const fetchBudgetById = (req, res, next) => {
        findById({
            id: req.params.id,
            budgetRepository: dbRepository
        })
            .then((budget) => {
                if (!budget) {
                    throw new Error('No budget found');
                }

                return res.json(budget);
            })
            .catch((error) => next(error));
    };

    const addNewBudget = (req, res, next) => {
        const userId = req.user.id;
        const { budgetLimit, categoryId, familyId } = req.body;

        addBudget({
            budgetLimit: budgetLimit,
            categoryId: categoryId,
            userId: userId,
            familyId: familyId,
            budgetRepository: dbRepository
        })
            .then((budget) => res.json(budget))
            .catch((error) => next(error));
    };

    const updateBudgetById = (req, res, next) => {
        const { budgetLimit, categoryId } = req.body;

        updateById({
            id: req.params.id,
            budgetLimit: budgetLimit,
            categoryId: categoryId,
            budgetRepository: dbRepository
        })
            .then((budget) => res.json(budget))
            .catch((error) => next(error));
    };

    const deleteBudgetById = (req, res, next) => {
        deleteBudget({
            id: req.params.id,
            budgetRepository: dbRepository
        })
            .then((budget) => res.json(budget))
            .catch((error) => next(error));
    };

    return {
        fetchAllBudgets,
        addNewBudget,
        fetchBudgetById,
        updateBudgetById,
        deleteBudgetById
    };
}
