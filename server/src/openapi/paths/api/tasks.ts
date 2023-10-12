import { OpenAPIV3 } from 'openapi-types';

export const tasks: OpenAPIV3.PathItemObject = {
	get: {
		summary: 'Get all tasks',
		operationId: 'getTasks',
		tags: ['tasks'],
		responses: {
			'200': {
				description: 'OK',
				content: {
					'application/json': {
						schema: {
							type: 'array',
							items: {
								$ref: '#/components/schemas/task',
							},
						},
					},
				},
			},
			['4XX']: { $ref: '#/components/responses/genericFail' },
		},
	},
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
