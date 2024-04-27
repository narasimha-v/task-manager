import { Request, Response, Router } from 'express';
import { notFound } from '../middleware';
import { getIPAddress } from '../utils';

const router = Router();

router.get('/', (req: Request, res: Response) => {
	const ip = getIPAddress(req);
	return res.send(`Hello human, you are coming from ${ip}`);
});

router.use(notFound);

export { router as api };
