import allowanceController from '../../../adapters/controllers/allowanceController';
import allowanceDbRepository from '../../../application/repositories/allowanceDbRepository';
import allowanceDbRepositoryMongoDB from '../../database/mongoDB/repositories/allowanceRepositoryMongoDB';
import authMiddleware from '../middlewares/authMiddleware';

export default function allowanceRouter(express, redisClient) {
    const router = express.Router();

    const controller = allowanceController(
        allowanceDbRepository,
        allowanceDbRepositoryMongoDB
    );

    router.route('/').get([authMiddleware], controller.fetchAllAllowances);
    router.route('/:id').get([authMiddleware], controller.fetchAllowanceById);
    router.route('/').post(authMiddleware, controller.addNewAllowance);
    router.route('/:id').put(authMiddleware, controller.updateAllowanceById);
    router.route('/:id').delete(authMiddleware, controller.deleteAllowanceById);

    return router;
}
