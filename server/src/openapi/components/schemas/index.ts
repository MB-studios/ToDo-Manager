import { OpenAPIV3 } from 'openapi-types';
import { jsonSchema as taskSchema } from '../../../models/task';

export const schemas: { [schemaName: string]: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject } = {
	task: taskSchema,
};
