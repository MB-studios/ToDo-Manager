import { OpenAPIV3 } from 'openapi-types';
import { success } from './success';
import { fail } from './fail';
import { generic } from './generic';
import { jsonSchema } from '../../../models/task';

export const schemas: { [schemaName: string]: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject } = {
	success,
	fail,
	generic,
	task: jsonSchema,
};
