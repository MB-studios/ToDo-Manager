import mongoose, { Document, Schema } from 'mongoose';
import m2s from 'mongoose-to-swagger';

export interface ITask {
	title: string;
	description: string;
	dueDate: Date;
	currentDueDate: Date;
	commingDueDate: Date;
	completedAt: Date;
	recurring: boolean;
	recurringInterval: number;
	recurringUnit: string;
	fixedRecurrance: boolean;
}

export interface ITaskModel extends ITask {}

const TaskSchema: Schema = new Schema(
	{
		_id: {
			type: mongoose.Types.ObjectId,
			required: true,
			default: () => {
				return new mongoose.Types.ObjectId();
			},
		},
		title: {
			type: String,
			required: true,
			default: '',
		},
		description: {
			type: String,
			default: '',
		},
		dueDate: {
			type: Date,
			default: undefined,
		},
		currentDueDate: {
			type: Date,
			default: undefined,
		},
		commingDueDate: {
			type: Date,
			default: undefined,
		},
		completedAt: {
			type: Date,
			default: undefined,
		},
		recurring: {
			type: Boolean,
			default: false,
		},
		recurringInterval: {
			type: Number,
			default: undefined,
		},
		recurringUnit: {
			type: String,
			default: undefined,
		},
		fixedRecurrance: {
			type: Boolean,
			default: false,
		},
	},
	{
		versionKey: false,
		timestamps: false,
	}
);

export const Task = mongoose.model<ITaskModel>('Task', TaskSchema);

export const jsonSchema = m2s(Task);
