import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@127.0.0.1:27017/todo-manager`;

const SERVER_URL = process.env.SERVER_URL || 'http://localhost';
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000;
const SERVER_API_BASE_PATH = process.env.SERVER_API_BASE_PATH || '/api';

export const config = {
	mongo: {
		url: MONGO_URL,
	},
	server: {
		url: SERVER_URL,
		port: SERVER_PORT,
		apiBasePath: SERVER_API_BASE_PATH,
	},
};
