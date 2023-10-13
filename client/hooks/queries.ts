import { useMutation, useQuery } from '@tanstack/react-query';
import type { ParamsOption, RequestBodyOption } from 'openapi-fetch';
import { paths, components } from 'lib/api/v1';
import client from 'lib/api';
import { UseFormGetValues } from 'react-hook-form';

type UseQueryOptions<T> = ParamsOption<T> &
	RequestBodyOption<T> & {
		reactQuery?: {};
	};

const TASKS = '/tasks';

export type Task = components['schemas']['task'];

export function getTasks({ params }: UseQueryOptions<paths[typeof TASKS]['get']>) {
	return useQuery({
		queryKey: [TASKS],
		queryFn: async ({ signal }) => {
			const { data, error } = await client.GET(TASKS, { params, signal });
			if (data) return data;
			throw new Error(error.message);
		},
	});
}

export function getTask(_id: string, initialData?: Partial<Task>, onSuccess?: Function) {
	return useQuery({
		queryKey: [TASKS, { _id }],
		queryFn: async ({ signal }) => {
			const { data, error } = await client.GET(`${TASKS}/{objectId}`, {
				params: { path: { objectId: _id } },
				signal,
			});
			if (data) return data;
			throw new Error(error.message);
		},
		initialData,
		onSuccess: (data) => {
			onSuccess && onSuccess(data);
		},
	});
}

export function upsertTask(getValues: UseFormGetValues<Task>, onSuccess: Function) {
	return useMutation<Task>({
		mutationKey: [TASKS],
		mutationFn: async (): Promise<Task> => {
			let values = getValues();
			if (values._id) {
				const { data, error } = await client.PUT(`${TASKS}/{objectId}`, {
					params: { path: { objectId: values._id } },
					body: values,
				});
				if (data) return data;
				throw new Error(error.details);
			} else {
				const { data, error } = await client.POST(TASKS, { body: getValues() });
				if (data) return data;
				throw new Error(error.details);
			}
		},
		onSuccess: () => {
			onSuccess();
		},
	});
}

export function deleteTask(_id: string, onSuccess: Function) {
	return useMutation({
		mutationKey: [TASKS, { _id }],
		mutationFn: async (): Promise<void> => {
			const { error } = await client.DELETE(`${TASKS}/{objectId}`, {
				params: { path: { objectId: _id } },
			});
			if (error) throw new Error(error.details);
		},
		onSuccess: () => {
			onSuccess();
		},
	});
}
