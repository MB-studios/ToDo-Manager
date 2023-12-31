import express from 'express';
import mongoose from 'mongoose';
import { config } from './config/config';
import { App } from './app';

const app = express();

app.on('ready', async (server: express.Application): Promise<void> => {
	try {
		server.listen(config.server.port, (): void => {
			console.log(`Server started on port ${config.server.port}`);
		});
	} catch (error) {
		console.error(error);
	}
});

new App(app).configure();

export { app };
