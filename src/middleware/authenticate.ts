import { NextFunction, Request, Response } from 'express';

export const isAuthenticated = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.isAuthenticated()) {
		return next();
	}
	return next(new Error('session expired'));
};
