import familyController from '../../../adapters/controllers/familyController';
import familyDbRepository from '../../../application/repositories/familyDbRepository';
import familyDbRepositoryMongoDB from '../../database/mongoDB/repositories/familyRepositoryMongoDB';
import authMiddleware from '../middlewares/authMiddleware';

export default function familyRouter(express, redisClient) {
    const router = express.Router();

    const controller = familyController(
        familyDbRepository,
        familyDbRepositoryMongoDB
    );

    router.route('/:id').put(authMiddleware, controller.updateFamilyById);

    return router;
}
