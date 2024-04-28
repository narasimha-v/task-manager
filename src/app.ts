import * as dotenv from 'dotenv';
dotenv.config();

import MongoStore from 'connect-mongo';
import cors from 'cors';
import express, { Express } from 'express';
import session from 'express-session';
import { mongo } from 'mongoose';
import { PORT, SESSION_OPTS, passport } from './config';
import { customErrorHandler } from './middleware';
import { api } from './routes';
import { connectDB } from './utils';

const setupMiddlewaresAndRoutes = (
	server: Express,
	dbClient: mongo.MongoClient
) => {
	const corsOrigins: (string | RegExp)[] = [];
	server.use(express.json());
	corsOrigins.push(/.*/);
	server.use(
		cors({
			origin: corsOrigins,
			credentials: true
		})
	);
	server.use(
		session({
			store: MongoStore.create({
				client: dbClient,
				stringify: false,
				autoRemove: 'interval',
				autoRemoveInterval: 60
			}),
			...SESSION_OPTS
		})
	);
	server.use(passport.initialize());
	server.use(passport.session());
	server.use(api);
	server.use(customErrorHandler);
};

const initApp = async () => {
	try {
		const server = express();
		const dbClient = await connectDB();
		setupMiddlewaresAndRoutes(server, dbClient);
		server.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (error: any) {
		console.error(`Error:${error.message}`);
	}
};

initApp();
