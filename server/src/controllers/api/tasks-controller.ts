import { NextFunction, Request, Response } from 'express';
import HttpError from '../http-error';
import { Task } from '../../models/task';
import mongoose from 'mongoose';

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
		let task = await Task.findById(req.params._id);
		if (!task) throw new HttpError(404, 'Task not found', `_id: ${req.params._id}`);
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
	try {
		const task = await Task.findByIdAndUpdate(req.params._id, req.body, { new: true });

		if (!task) throw new HttpError(404, 'Task not found', `_id: ${req.params._id}`);

		res.status(200).send(task);
	} catch (error) {
		if (error.status !== 404) console.error(error);
		next(error);
	}
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
	try {
		let task = await Task.findByIdAndDelete(req.params._id);
		if (!task) throw new HttpError(404, 'Task not found', `_id: ${req.params.objectId}`);
		res.status(200).send(task);
	} catch (error) {
		if (error.status !== 404) console.error(error);
		next(error);
	}
};

export const upsertTask = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.body._id) req.body._id = new mongoose.Types.ObjectId();
		const task = await Task.findByIdAndUpdate(req.body._id, req.body, {
			new: true,
			upsert: true,
		});
		res.status(201).send(task);
	} catch (error) {
		if (error.status !== 404) console.error(error);
		next(error);
	}
};
