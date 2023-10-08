import { connect } from 'mongoose';
import { config } from './config/config';

const connectDB = async () => {
	try {
		await connect(config.mongo.url);
		console.log('MongoDB connected');
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

export default connectDB;
