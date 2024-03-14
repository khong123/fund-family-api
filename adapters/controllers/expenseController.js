import findAll from '../../application/use_cases/expense/findAll';
import countAll from '../../application/use_cases/expense/countAll';
import addExpense from '../../application/use_cases/expense/add';
import findById from '../../application/use_cases/expense/findById';
import updateById from '../../application/use_cases/expense/updateById';
import deleteExpense from '../../application/use_cases/expense/deleteById';

export default function expenseController(
    expenseDbRepository,
    expenseDbRepositoryImpl
) {
    const dbRepository = expenseDbRepository(expenseDbRepositoryImpl());

    const fetchAllExpenses = (req, res, next) => {
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
            expenseRepository: dbRepository
        })
            .then((expenses) => {
                response.expenses = expenses;

                return countAll({
                    params: params,
                    expenseRepository: dbRepository
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

    const fetchExpenseById = (req, res, next) => {
        findById({
            id: req.params.id,
            expenseRepository: dbRepository
        })
            .then((expense) => {
                if (!expense) {
                    throw new Error('No expense found');
                }

                return res.json(expense);
            })
            .catch((error) => next(error));
    };

    const addNewExpense = (req, res, next) => {
        const userId = req.user.id;
        const { amount, description, recordedAt, categoryId, familyId } = req.body;

        addExpense({
            amount: amount,
            description: description,
            recordedAt: recordedAt,
            categoryId: categoryId,
            userId: userId,
            familyId: familyId,
            expenseRepository: dbRepository
        })
            .then((expense) => res.json(expense))
            .catch((error) => next(error));
    };

    const updateExpenseById = (req, res, next) => {
        const { amount, description, recordedAt, categoryId } = req.body;

        updateById({
            id: req.params.id,
            amount: amount,
            description: description,
            recordedAt: recordedAt,
            categoryId: categoryId,
            expenseRepository: dbRepository
        })
            .then((expense) => res.json(expense))
            .catch((error) => next(error));
    };

    const deleteExpenseById = (req, res, next) => {
        deleteExpense({
            id: req.params.id,
            expenseRepository: dbRepository
        })
            .then((expense) => res.json(expense))
            .catch((error) => next(error));
    };

    return {
        fetchAllExpenses,
        addNewExpense,
        fetchExpenseById,
        updateExpenseById,
        deleteExpenseById
    };
}
