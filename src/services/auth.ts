import { hash } from 'bcrypt';
import { HASH_ROUNDS } from '../config';
import { Err } from '../middleware';
import { User } from '../models';

export const signUp = async (
	firstName: string,
	lastName: string,
	email: string,
	password: string
) => {
	const [hashedPassword, existingUser] = await Promise.all([
		hash(password, HASH_ROUNDS),
		User.findOne({ email })
	]);

	if (existingUser) {
		throw new Err('User already exists', 400);
	}

	const user = new User({
		firstName,
		lastName,
		email,
		passwordHash: hashedPassword
	});

	await user.save();

	return user;
};
