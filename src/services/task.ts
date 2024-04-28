import { Err } from '../middleware';
import { Task, TaskDoc, TaskStatus } from '../models';

export const getTasks = async (userId: string, filter?: TaskStatus) => {
	let tasks: TaskDoc[] = [];

	if (filter) {
		tasks = await Task.find({ user: userId, status: filter });
	} else {
		tasks = await Task.find({ user: userId });
	}

	return tasks;
};

export const getTask = async (userId: string, taskId: string) => {
	const task = await Task.findOne({
		user: userId,
		_id: taskId
	});

	if (!task) {
		throw new Err('Task not found', 404);
	}

	return task;
};

export const createTask = async (
	userId: string,
	title: string,
	description: string
) => {
	if (!title || !description) {
		throw new Err('Title and description are required', 400);
	}

	const task = new Task({
		user: userId,
		title,
		description
	});

	await task.save();

	return task;
};

export const updateTask = async (
	userId: string,
	taskId: string,
	status: TaskStatus
) => {
	const task = await Task.findOneAndUpdate(
		{ user: userId, _id: taskId },
		{
			status
		},
		{ new: true }
	);

	if (!task) {
		throw new Err('Task not found', 404);
	}

	return task;
};

export const deleteTask = async (userId: string, taskId: string) => {
	const task = await Task.deleteOne({
		user: userId,
		_id: taskId
	});

	if (!task) {
		throw new Err('Task not found', 404);
	}
};
