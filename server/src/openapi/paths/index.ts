import { OpenAPIV3 } from 'openapi-types';
import { tasks } from './api/tasks';
import { tasksId } from './api/tasksId';

export const paths: OpenAPIV3.PathsObject = {
	'/api/tasks': tasks,
	'/api/tasks/{objectId}': tasksId,
};
