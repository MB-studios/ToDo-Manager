import mongoose, { Document, Schema } from 'mongoose';
import m2s from 'mongoose-to-swagger';

export interface ITask {
	title: string;
	description: string;
	completed: boolean;
}

export interface ITaskModel extends ITask, Document {}

const TaskSchema: Schema = new Schema(
	{
		_id: {
			type: mongoose.Types.ObjectId,
			default: () => {
				return new mongoose.Types.ObjectId();
			},
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			default: '',
		},
		completed: {
			type: Boolean,
			default: false,
		},
		dueDate: {
			type: Date,
			default: null,
		},
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

export const Task = mongoose.model<ITaskModel>('Task', TaskSchema);

export const jsonSchema = m2s(Task);
