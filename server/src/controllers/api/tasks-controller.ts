import { NextFunction, Request, Response } from 'express';
import HttpError from '../http-error';
import { Task } from '../../models/task';

export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const tasks = await Task.find();
		res.send(tasks);
	} catch (error) {
		if (error.status !== 404) console.error(error);
		next(error);
	}
};

export const getTask = async (req: Request, res: Response, next: NextFunction) => {
	try {
		let task = await Task.findById(req.params.objectId);
		if (!task) throw new HttpError(404, 'Task not found', `objectId: ${req.params.objectId}`);
		res.status(200).send(task);
	} catch (error) {
		if (error.status !== 404) console.error(error);
		next(error);
	}
};

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const task = new Task(req.body);
		await task.save();
		res.status(201).send(task);
	} catch (error) {
		if (error.status !== 404) console.error(error);
		next(error);
	}
};

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
	console.log('updateTask');
	console.log(req.params);
	try {
		const task = await Task.findByIdAndUpdate(req.params.objectId, req.body, { new: true });

		if (!task) throw new HttpError(404, 'Task not found', `objectId: ${req.params.objectId}`);

		res.status(200).send(task);
	} catch (error) {
		if (error.status !== 404) console.error(error);
		next(error);
	}
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
	try {
		let task = await Task.findByIdAndDelete(req.params.objectId);
		if (!task) throw new HttpError(404, 'Task not found', `objectId: ${req.params.objectId}`);
		res.status(200).send(task);
	} catch (error) {
		if (error.status !== 404) console.error(error);
		next(error);
	}
};
