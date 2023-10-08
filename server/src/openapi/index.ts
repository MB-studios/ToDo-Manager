import { OpenAPIV3 } from 'openapi-types';
import { paths } from './paths';
import { schemas } from './components/schemas';
import { parameters } from './parameters';
import { responses } from './components/responses';

export const apiDoc: OpenAPIV3.Document = {
	openapi: '3.0.0',
	info: {
		title: 'Todo-Manager API',
		version: '1.0.0',
	},
	paths,
	components: {
		schemas,
		parameters,
		responses,
	},
};
