import { RequestHandler } from 'express';
import { getTasks, getTask, createTask, updateTask, patchTask, deleteTask } from './api/tasks-controller';
export const controllers: { [controllerName: string]: RequestHandler } = {
	getTasks,
	getTask,
	createTask,
	updateTask,
	patchTask,
	deleteTask,
};
