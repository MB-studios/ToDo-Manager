import client from 'api';
import { Task } from 'api/types';

const path = '/task';

// POST /task
export const createTask = async (task: Exclude<Task, '_id'>): Promise<Task> => {
	const { data, error } = await client.POST(path, { body: task });
	if (data) return data;
	throw new Error(error.message);
};

// PUT /TASK
export const updateTask = async (task: Task): Promise<Task> => {
	const { data, error } = await client.PUT(path, { body: task });
	if (data) return data;
	throw new Error(error.message);
};

// GET /task/{_id}
export const getTask = async ({ _id }: { _id: string }): Promise<Task> => {
	const { data, error } = await client.GET(`${path}/{_id}`, { params: { path: { _id } } });
	if (data) return data;
	throw new Error(error.message);
};

// PATCH /task/{_id}
export const patchTask = async ({ _id, task }: { _id: string; task: Partial<Task> }): Promise<Task> => {
	const { data, error } = await client.PATCH(`${path}/{_id}`, { params: { path: { _id } }, body: task });
	if (data) return data;
	throw new Error(error.message);
};

// DELETE /task/{_id}
export const deleteTask = async (_id: string): Promise<Task> => {
	const { data, error } = await client.DELETE(`${path}/{_id}`, { params: { path: { _id } } });
	if (data) return data;
	throw new Error(error.message);
};
