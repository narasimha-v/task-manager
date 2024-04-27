import { Router } from 'express';
import { isAuthenticated } from '../middleware';
import { TaskStatus } from '../models';
import {
	createTask,
	deleteTask,
	getTask,
	getTasks,
	updateTask
} from '../services';

const router = Router();

router.use(isAuthenticated);

router.get('/', async (req, res, next) => {
	try {
		const { status } = req.query;
		const tasks = await getTasks(
			req.user._id,
			status ? (status as TaskStatus) : undefined
		);
		return res.status(200).json(tasks);
	} catch (error) {
		next(error);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		const task = await getTask(req.user._id, req.params.id);
		return res.status(200).json(task);
	} catch (error) {
		next(error);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const { title, description } = req.body;
		const task = await createTask(req.user._id, title, description);
		return res.status(201).json(task);
	} catch (error) {
		next(error);
	}
});

router.put('/:id', async (req, res, next) => {
	try {
		const { title, description, status } = req.body;
		const task = await updateTask(
			req.user._id,
			req.params.id,
			title,
			description,
			status
		);
		return res.status(200).json(task);
	} catch (error) {
		next(error);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		await deleteTask(req.user._id, req.params.id);
		return res.status(204).json({
			message: 'Task deleted'
		});
	} catch (error) {
		next(error);
	}
});

export { router as taskRouter };
