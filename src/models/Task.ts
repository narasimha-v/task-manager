import { Document, model, PopulatedDoc, Schema } from 'mongoose';
import { UserDoc } from './User';

export enum TaskStatus {
	TODO = 'TODO',
	IN_PROGRESS = 'IN_PROGRESS',
	COMPLETED = 'COMPLETED'
}

export interface Task {
	user: PopulatedDoc<UserDoc>;
	title: string;
	description: string;
	status: TaskStatus;
	createdAt: Date;
	updatedAt: Date;
}

export type TaskDoc = Task & Document;

const TaskSchema = new Schema<TaskDoc>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		title: {
			type: String,
			required: true,
			trim: true,
			minlength: 1
		},
		description: {
			type: String,
			required: true,
			trim: true,
			minlength: 1
		},
		status: {
			type: String,
			enum: Object.values(TaskStatus),
			default: TaskStatus.TODO,
			required: true
		}
	},
	{
		toJSON: {
			transform: (_, ret: Partial<TaskDoc>) => {
				delete ret.__v;
				delete ret.createdAt;
				delete ret.updatedAt;
			}
		},
		timestamps: true
	}
);

export const Task = model<TaskDoc>('Task', TaskSchema);
