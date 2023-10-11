import { useQuery } from '@tanstack/react-query';
import type { ParamsOption, RequestBodyOption } from 'openapi-fetch';
import { paths, components } from '../lib/api/v1';
import client from '../lib/api';

type UseQueryOptions<T> = ParamsOption<T> &
	RequestBodyOption<T> & {
		reactQuery?: {};
	};

const GET_TASKS = '/tasks';

export type Task = components['schemas']['task'];

export function getTasks({ params, body, reactQuery }: UseQueryOptions<paths[typeof GET_TASKS]['get']>) {
	return useQuery({
		...reactQuery,
		queryKey: [GET_TASKS],
		queryFn: async ({ signal }) => {
			const { data, error } = await client.GET(GET_TASKS, { params, signal });
			if (data) return data;
			throw new Error(error);
		},
	});
}
