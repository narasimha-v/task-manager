import { Request, Response, Router } from 'express';
import { notFound } from '../middleware';
import { getIPAddress } from '../utils';
import { authRouter } from './authRoute';
import { taskRouter } from './taskRoute';

const router = Router();

router.get('/', (req: Request, res: Response) => {
	const ip = getIPAddress(req);
	return res.send(`Hello human, you are coming from ${ip}`);
});

router.use('/auth', authRouter);
router.use('/tasks', taskRouter);
router.use(notFound);

export { router as api };
