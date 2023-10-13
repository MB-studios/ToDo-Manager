import { OpenAPIV3 } from 'openapi-types';

export const taskId: OpenAPIV3.PathItemObject = {
	get: {
		summary: 'Get a task',
		operationId: 'getTask',
		tags: ['tasks'],
		parameters: [{ $ref: '#/components/parameters/_id' }],
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
	put: {
		summary: 'Update a task',
		operationId: 'updateTask',
		tags: ['tasks'],
		parameters: [{ $ref: '#/components/parameters/_id' }],
		requestBody: {
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {
							title: { $ref: '#/components/schemas/task/properties/title' },
							description: { $ref: '#/components/schemas/task/properties/description' },
							completed: { $ref: '#/components/schemas/task/properties/completed' },
						},
						minProperties: 1,
					},
				},
			},
		},
		responses: {
			['200']: {
				description: 'Updated',
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
	delete: {
		summary: 'Delete a task',
		operationId: 'deleteTask',
		tags: ['tasks'],
		parameters: [{ $ref: '#/components/parameters/_id' }],
		responses: {
			['200']: {
				description: 'Deleted',
				content: {
					'application/json': {
						schema: {
							type: 'object',
							properties: {
								task: {
									$ref: '#/components/schemas/task',
								},
							},
						},
					},
				},
			},
			['4XX']: { $ref: '#/components/responses/genericFail' },
		},
	},
};
