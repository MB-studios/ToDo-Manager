import { OpenAPIV3 } from 'openapi-types';
import { task } from './api/task';
import { taskId } from './api/tasksId';
import { tasks } from './api/tasks';

export const paths: OpenAPIV3.PathsObject = {
	'/task': task,
	'/task/{_id}': taskId,
	'/tasks': tasks,
};
