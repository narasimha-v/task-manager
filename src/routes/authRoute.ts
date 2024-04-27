import { Router } from 'express';
import { passport } from '../config';
import { Err } from '../middleware';
import { signUp } from '../services';

const router = Router();

router.post('/sign-up', async (req, res, next) => {
	try {
		const { firstName, lastName, email, password } = req.body;

		const user = await signUp(firstName, lastName, email, password);

		req.logIn(user, (error) => {
			if (error) {
				throw new Err('Error logging in after email verification', 400);
			}
			res.status(201).json({ user });
		});
	} catch (error) {
		next(error);
	}
});

router.post(
	'/sign-in',
	passport.authenticate('local'),
	async (req, res, next) => {
		try {
			res.json({ user: req.user });
		} catch (error) {
			next(error);
		}
	}
);

router.get('/sign-out', (req, res, next) => {
	try {
		req.logout((err) => {
			if (err) {
				throw new Err('Error logging out', 400);
			}
			res.status(200).json({ success: true });
		});
	} catch (error) {
		next(error);
	}
});

export { router as authRouter };
