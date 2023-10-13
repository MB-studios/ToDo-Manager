import { OpenAPIV3 } from 'openapi-types';

export const _id: OpenAPIV3.ParameterObject = {
	name: '_id',
	in: 'path',
	description: 'Object ID',
	schema: {
		pattern: '^[0-9a-fA-F]{24}$',
		type: 'string',
		format: 'mongo-id',
	},
	required: true,
};
