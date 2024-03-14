import authController from '../../../adapters/controllers/authController';
import userDbRepository from '../../../application/repositories/userDbRepository';
import userDbRepositoryMongoDB from '../../database/mongoDB/repositories/userRepositoryMongoDB';
import familyDbRepository from '../../../application/repositories/familyDbRepository';
import familyDbRepositoryMongoDB from '../../database/mongoDB/repositories/familyRepositoryMongoDB';
import verificationTokenDbRepository from '../../../application/repositories/verificationTokenDbRepository';
import verificationTokenDbRepositoryMongoDB from '../../database/mongoDB/repositories/verificationTokenRepositoryMongoDB';
import authServiceInterface from '../../../application/services/authService';
import authServiceImpl from '../../services/authService';
import emailServiceInterface from '../../../application/services/emailService';
import emailServiceImpl from '../../services/emailService';

export default function authRouter(express) {
  const router = express.Router();

  const controller = authController(
    userDbRepository,
    userDbRepositoryMongoDB,
    familyDbRepository,
    familyDbRepositoryMongoDB,
    verificationTokenDbRepository,
    verificationTokenDbRepositoryMongoDB,
    authServiceInterface,
    authServiceImpl,
    emailServiceInterface,
    emailServiceImpl
  );

  router.route('/login').post(controller.loginUser);
  router.route('/register').post(controller.registerUser);
  router.route('/verify/:token').get(controller.verifyEmail);

  return router;
}