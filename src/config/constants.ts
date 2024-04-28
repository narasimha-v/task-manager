import { SessionOptions } from 'express-session';

export const HASH_ROUNDS = 11;
export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI!;
export const APP_URL = process.env.APP_URL as string;
export const APP_DOMAIN = new URL(APP_URL).hostname;

const SESSION_SECRET_KEY = process.env.SESSION_SECRET_KEY!;

export const IS_TEST = process.env.NODE_ENV == 'test';
export const IS_STAGING = process.env.NODE_ENV == 'staging';
export const IS_PROD = process.env.NODE_ENV === 'production';
export const IS_DEV = !IS_PROD && !IS_STAGING && !IS_TEST;

export const SESSION_OPTS: SessionOptions = {
	cookie: {
		domain: APP_DOMAIN,
		httpOnly: true,
		maxAge: 1000 * 60 * 60 * 24 * 365,
		sameSite: IS_DEV ? 'strict' : 'none',
		secure: !IS_DEV
	},
	name: 'sid',
	resave: false,
	rolling: true,
	saveUninitialized: false,
	secret: SESSION_SECRET_KEY,
	proxy: true
};
