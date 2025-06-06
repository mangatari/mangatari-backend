import { Router } from 'express';
const indexRouter = Router();
indexRouter.get('/', (req, res) => {
  res.json('All good in here');
});

export default indexRouter;
