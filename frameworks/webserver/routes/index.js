import authRouter from './auth';
import userRouter from './user';
import familyRouter from './family';
import allowanceRouter from './allowance';
import budgetRouter from './budget';
import categoryRouter from './category';
import choreRouter from './chore';
import expenseRouter from './expense';

export default function routes(app, express, redisClient) {
  app.use('/api/v1', authRouter(express, redisClient));
  app.use('/api/v1/users', userRouter(express, redisClient));
  app.use('/api/v1/families', familyRouter(express, redisClient));
  app.use('/api/v1/allowances', allowanceRouter(express, redisClient));
  app.use('/api/v1/budgets', budgetRouter(express, redisClient));
  app.use('/api/v1/categories', categoryRouter(express, redisClient));
  app.use('/api/v1/chores', choreRouter(express, redisClient));
  app.use('/api/v1/expenses', expenseRouter(express, redisClient));
}