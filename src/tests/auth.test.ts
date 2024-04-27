import { User } from '../models';
import { expect } from 'chai';
import { signUp } from '../services';
import { setupDBConnectionForTesting } from './setup';

describe('Auth', async () => {
	setupDBConnectionForTesting();

	it('Should be able register as a new user', async () => {
		await signUp('John', 'Doe', 'john@gmail.com', 'Testing1!');

		const user = await User.findOne({
			email: 'john@gmail.com'
		});

		expect(user).to.exist;
		expect(user?.email).to.equal('john@gmail.com');
	});
});
