import { Application, json, urlencoded } from 'express';
import { Server, createServer } from 'http';
import logger from 'morgan';
import { initialize } from 'express-openapi';
import { apiDoc } from './openapi';
import { controllers } from './controllers';
import swaggerUi from 'swagger-ui-express';
import { SwaggerTheme } from 'swagger-themes';
import * as OpenApiValidator from 'express-openapi-validator';
import connectDB from './db';
import mongoose from 'mongoose';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { error } from 'console';

const theme = new SwaggerTheme('v3');

export class App {
	private server: Server;
	constructor(private app: Application) {
		this.server = createServer(this.app);
		this.composeMiddlewares();
	}

	public async configure(): Promise<void> {
		await connectDB();
		await this.app.emit('ready', this.server);
		await this.generateSpec();
	}

	private async composeMiddlewares(): Promise<void> {
		this.app.use(logger('dev'));
		this.app.use(json());
		this.app.use(urlencoded({ extended: false }));
	}

	private async generateSpec(): Promise<void> {
		let OpenAPIFramework = await initialize({
			app: this.app,
			apiDoc,
			operations: controllers,
		});

		this.app.use(
			'/api-documentation',
			swaggerUi.serve,
			swaggerUi.setup(null, { swaggerUrl: 'http://localhost:3000/api-docs', customCss: theme.getBuffer('dark') })
		);

		this.app.use(
			OpenApiValidator.middleware({
				apiSpec: OpenAPIFramework.apiDoc,
				validateRequests: true,
				validateResponses: true,
				validateApiSpec: true,
				serDes: [
					{
						format: 'mongo-objectid',
						deserialize: (value) => new mongoose.Types.ObjectId(value as string),
						serialize: (value) => new mongoose.Types.ObjectId(value as string).toString(),
					},
				],
			})
		);
		this.app.use(errorMiddleware);
	}
}
