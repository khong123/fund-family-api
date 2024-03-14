import userController from '../../../adapters/controllers/userController';
import userDbRepository from '../../../application/repositories/userDbRepository';
import userDbRepositoryMongoDB from '../../database/mongoDB/repositories/userRepositoryMongoDB';
import verificationTokenDbRepository from '../../../application/repositories/verificationTokenDbRepository';
import verificationTokenDbRepositoryMongoDB from '../../database/mongoDB/repositories/verificationTokenRepositoryMongoDB';
import emailServiceInterface from '../../../application/services/emailService';
import emailServiceImpl from '../../services/emailService';
import authMiddleware from '../middlewares/authMiddleware';

export default function userRouter(express) {
  const router = express.Router();

  const controller = userController(
    userDbRepository,
    userDbRepositoryMongoDB,
    verificationTokenDbRepository,
    verificationTokenDbRepositoryMongoDB,
    emailServiceInterface,
    emailServiceImpl
  );

  router.route('/me').get(authMiddleware, controller.getMe);
  router.route('/me').put(authMiddleware, controller.updateMe);
  router.route('/invite').post(authMiddleware, controller.inviteUser);

  return router;
}