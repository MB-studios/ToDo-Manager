import { components } from 'api/v1';

export type Task = components['schemas']['task'];
export type TaskPartial = Partial<Task>;
export type TaskNoId = Omit<Task, '_id'>;
