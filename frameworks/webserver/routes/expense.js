import expenseController from '../../../adapters/controllers/expenseController';
import expenseDbRepository from '../../../application/repositories/expenseDbRepository';
import expenseDbRepositoryMongoDB from '../../database/mongoDB/repositories/expenseRepositoryMongoDB';
import authMiddleware from '../middlewares/authMiddleware';

export default function expenseRouter(express, redisClient) {
  const router = express.Router();

  const controller = expenseController(
    expenseDbRepository,
    expenseDbRepositoryMongoDB
  );

  router.route('/').get([authMiddleware], controller.fetchAllExpenses);
  router.route('/:id').get([authMiddleware], controller.fetchExpenseById);
  router.route('/').post(authMiddleware, controller.addNewExpense);
  router.route('/:id').put(authMiddleware, controller.updateExpenseById);
  router.route('/:id').delete(authMiddleware, controller.deleteExpenseById);

  return router;
}
