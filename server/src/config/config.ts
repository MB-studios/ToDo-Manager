import dotenv from 'dotenv';

dotenv.config();

const MONGO_HOST = process.env.MONGO_HOST || '';
const MONGO_PORT = process.env.MONGO_PORT ? Number(process.env.MONGO_PORT) : 27017;
const MONGO_PATH = process.env.MONGO_PATH || '';
const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_PATH}`;

const SERVER_URL = process.env.SERVER_URL || 'http://localhost';
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000;
const SERVER_API_BASE_PATH = process.env.SERVER_API_BASE_PATH || 'api';

const EXPORTS_DIR = process.env.EXPORTS_DIR || 'exports';

export const config = {
	mongo: {
		url: MONGO_URL,
	},
	server: {
		url: SERVER_URL,
		port: SERVER_PORT,
		apiBasePath: SERVER_API_BASE_PATH,
		exportsDir: EXPORTS_DIR,
	},
};
