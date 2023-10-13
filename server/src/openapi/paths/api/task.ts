import { OpenAPIV3 } from 'openapi-types';

export const task: OpenAPIV3.PathItemObject = {
	post: {
		summary: 'Create a new task',
		operationId: 'createTask',
		tags: ['tasks'],
		requestBody: {
			content: {
				'application/json': {
					schema: {
						type: 'object',
						required: ['title'],
						properties: {
							title: { $ref: '#/components/schemas/task/properties/title' },
							description: { $ref: '#/components/schemas/task/properties/description' },
							completed: { $ref: '#/components/schemas/task/properties/completed' },
						},
					},
				},
			},
		},
		responses: {
			['201']: {
				description: 'Created',
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/task',
						},
					},
				},
			},
			['4XX']: { $ref: '#/components/responses/genericFail' },
		},
	},
};
