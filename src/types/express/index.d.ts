import { UserDoc } from '../../models';

declare module 'express-serve-static-core' {
	interface Request {
		user: UserDoc;
	}
}
