import client from 'api';
import { Task } from 'api/types';

const path = '/tasks';

export const getTasks = async (): Promise<Task[]> => {
	const { data, error } = await client.GET(path);
	if (data) return data;
	throw new Error(error.message);
};
