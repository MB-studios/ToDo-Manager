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
};
