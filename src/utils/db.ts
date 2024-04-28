import mongoose from 'mongoose';
import { MONGO_URI } from '../config/constants';

export const connectDB = async () => {
	try {
		console.log('Connecting to MongoDB...');
		const res = await mongoose.connect(MONGO_URI, {
			retryWrites: true,
			w: 'majority'
		});

		console.log(`MongoDB connected: ${res.connection.host}`);
		process.on('exit', async () => {
			await mongoose.connection.close();
		});

		return res.connection.getClient();
	} catch (error: any) {
		console.error(`Error:${error.message}`);
		process.exit(1);
	}
};
