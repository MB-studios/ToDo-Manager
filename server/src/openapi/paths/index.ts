import { OpenAPIV3 } from 'openapi-types';
import { task } from './api/task';
import { tasksId } from './api/tasksId';
import { tasks } from './api/tasks';

export const paths: OpenAPIV3.PathsObject = {
	'/task': task,
	'/task/{_id}': tasksId,
	'/tasks': tasks,
};
