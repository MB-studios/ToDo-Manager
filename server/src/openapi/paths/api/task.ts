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
							completedAt: { $ref: '#/components/schemas/task/properties/completedAt' },
							recurring: { $ref: '#/components/schemas/task/properties/recurring' },
							recurringInterval: { $ref: '#/components/schemas/task/properties/recurringInterval' },
							recurringUnit: { $ref: '#/components/schemas/task/properties/recurringUnit' },
							fixedRecurrance: { $ref: '#/components/schemas/task/properties/fixedRecurrance' },
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
	put: {
		summary: 'Update task',
		operationId: 'updateTask',
		tags: ['tasks'],
		requestBody: {
			content: {
				'application/json': {
					schema: {
						$ref: '#/components/schemas/task',
					},
				},
			},
		},
		responses: {
			['200']: {
				description: 'OK',
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
