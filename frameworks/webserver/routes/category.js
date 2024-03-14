import categoryController from '../../../adapters/controllers/categoryController';
import categoryDbRepository from '../../../application/repositories/categoryDbRepository';
import categoryDbRepositoryMongoDB from '../../database/mongoDB/repositories/categoryRepositoryMongoDB';
import authMiddleware from '../middlewares/authMiddleware';

export default function categoryRouter(express, redisClient) {
    const router = express.Router();

    const controller = categoryController(
        categoryDbRepository,
        categoryDbRepositoryMongoDB
    );

    router.route('/').get([authMiddleware], controller.fetchAllCategories);
    router.route('/:id').get([authMiddleware], controller.fetchCategoryById);
    router.route('/').post(authMiddleware, controller.addNewCategory);
    router.route('/:id').put(authMiddleware, controller.updateCategoryById);
    router.route('/:id').delete(authMiddleware, controller.deleteCategoryById);

    return router;
}
