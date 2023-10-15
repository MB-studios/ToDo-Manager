import client from 'api';
import { Task } from 'api/types';

const path = '/task';

export const getTask = async ({ _id }: { _id: string }): Promise<Task> => {
	const { data, error } = await client.GET(`${path}/{_id}`, { params: { path: { _id } } });
	if (data) return data;
	throw new Error(error.message);
};

export const upsertTask = async (task: Task): Promise<Task> => {
	const { data, error } = await client.PUT(path, { body: task });
	if (data) return data;
	throw new Error(error.message);
};

export const deleteTask = async (_id: string): Promise<Task> => {
	const { data, error } = await client.DELETE(`${path}/{_id}`, { params: { path: { _id } } });
	if (data) return data;
	throw new Error(error.message);
};
