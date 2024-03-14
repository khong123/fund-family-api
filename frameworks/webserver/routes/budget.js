import budgetController from '../../../adapters/controllers/budgetController';
import budgetDbRepository from '../../../application/repositories/budgetDbRepository';
import budgetDbRepositoryMongoDB from '../../database/mongoDB/repositories/budgetRepositoryMongoDB';
import authMiddleware from '../middlewares/authMiddleware';

export default function budgetRouter(express, redisClient) {
    const router = express.Router();

    const controller = budgetController(
        budgetDbRepository,
        budgetDbRepositoryMongoDB
    );

    router.route('/').get([authMiddleware], controller.fetchAllBudgets);
    router.route('/:id').get([authMiddleware], controller.fetchBudgetById);
    router.route('/').post(authMiddleware, controller.addNewBudget);
    router.route('/:id').put(authMiddleware, controller.updateBudgetById);
    router.route('/:id').delete(authMiddleware, controller.deleteBudgetById);

    return router;
}
