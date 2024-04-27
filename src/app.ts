import * as dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express, { Express } from 'express';
import { customErrorHandler } from './middleware';
import { api } from './routes';
import { connectDB } from './utils';
import { PORT } from './config';

const setupMiddlewaresAndRoutes = (server: Express) => {
	const corsOrigins: (string | RegExp)[] = [];
	server.use(express.json());
	corsOrigins.push(/.*/);
	server.use(
		cors({
			origin: corsOrigins,
			credentials: true
		})
	);
	server.use(api);
	server.use(customErrorHandler);
};

const initApp = async () => {
	try {
		const server = express();
		await connectDB();
		setupMiddlewaresAndRoutes(server);
		server.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (error: any) {
		console.error(`Error:${error.message}`);
	}
};

initApp();
