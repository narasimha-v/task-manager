import { Task, TaskStatus } from '../models';
import { expect } from 'chai';
import {
	createTask,
	deleteTask,
	getTask,
	getTasks,
	signUp,
	updateTask
} from '../services';
import { setupDBConnectionForTesting } from './setup';

const createNewTask = async () => {
	const user = await signUp('John', 'Doe', 'john@gmail.com', 'Testing1!');

	const task = await createTask(user._id, 'Task 1', 'Description 1');

	return { user, task };
};

describe('Task', async () => {
	setupDBConnectionForTesting();

	it('Should be able to create a new task', async () => {
		const { task } = await createNewTask();

		expect(task).to.exist;
		expect(task.title).to.equal('Task 1');
		expect(task.description).to.equal('Description 1');
	});

	it('Should be able to get tasks', async () => {
		const { user } = await createNewTask();
		await createTask(user._id, 'Task 2', 'Description 2');

		const tasks = await getTasks(user._id);
		expect(tasks).to.have.lengthOf(2);
	});

	it('Should be able to get tasks by status', async () => {
		const { user, task } = await createNewTask();
		await createTask(user._id, 'Task 2', 'Description 2');

		await Task.findOneAndUpdate(
			{ _id: task._id },
			{ status: TaskStatus.COMPLETED }
		);

		const tasks = await getTasks(user._id, TaskStatus.COMPLETED);

		expect(tasks).to.have.lengthOf(1);
	});

	it('Should be able to get a task by Id', async () => {
		const { user, task } = await createNewTask();

		const foundTask = await getTask(user._id, task._id);

		expect(foundTask).to.exist;
		expect(foundTask.title).to.equal(task.title);
	});

	it('Should be able to update a task', async () => {
		const { user, task } = await createNewTask();

		const updatedTask = await updateTask(
			user._id,
			task._id,
			'Task 1 Updated',
			'Description 1 Updated',
			TaskStatus.COMPLETED
		);

		expect(updatedTask).to.exist;
		expect(updatedTask.title).to.equal('Task 1 Updated');
		expect(updatedTask.description).to.equal('Description 1 Updated');
		expect(updatedTask.status).to.equal(TaskStatus.COMPLETED);
	});

	it('Should be able to delete a task', async () => {
		const { user, task } = await createNewTask();

		await deleteTask(user._id, task._id);

		const foundTask = await Task.findOne({
			user: user._id,
			_id: task._id
		});

		expect(foundTask).to.not.exist;
	});
});
