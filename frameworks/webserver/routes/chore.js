import choreController from '../../../adapters/controllers/choreController';
import choreDbRepository from '../../../application/repositories/choreDbRepository';
import choreDbRepositoryMongoDB from '../../database/mongoDB/repositories/choreRepositoryMongoDB';
import authMiddleware from '../middlewares/authMiddleware';

export default function choreRouter(express, redisClient) {
    const router = express.Router();

    const controller = choreController(
        choreDbRepository,
        choreDbRepositoryMongoDB
    );

    router.route('/').get([authMiddleware], controller.fetchAllChores);
    router.route('/:id').get([authMiddleware], controller.fetchChoreById);
    router.route('/').post(authMiddleware, controller.addNewChore);
    router.route('/:id').put(authMiddleware, controller.updateChoreById);
    router.route('/:id').delete(authMiddleware, controller.deleteChoreById);

    return router;
}
