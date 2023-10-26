import { DateTime } from 'luxon';
import { Task } from 'api/types';

export type sectionEntry = {
	title: string;
	data: Task[];
	order: number;
};

export default function formatSections(tasks: Task[] | undefined) {
	if (!tasks) return { tasks: [], completed: [] };

	interface sectionMapEntry {
		order: number;
		data: Task[];
	}

	interface sectionMap {
		[sectionName: string]: sectionMapEntry;
	}

	let tasksMap: sectionMap = {
		Overdue: { order: 0, data: [] },
		Today: { order: 1, data: [] },
		'This Week': { order: 2, data: [] },
		'Next Week': { order: 3, data: [] },
		'This Month': { order: 5, data: [] },
		'Next Month': { order: 6, data: [] },
		'This Year': { order: 7, data: [] },
		'Next Year': { order: 8, data: [] },
		'Comming 10 years': { order: 9, data: [] },
		'Far ahead': { order: 10, data: [] },
		"Somone else's problem": { order: 11, data: [] },
		'No Due Date': { order: 4, data: [] },
	};

	let completedMap: sectionMap = {
		'Recently Completed': { order: 0, data: [] },
	};

	const today = DateTime.now().startOf('day');
	tasks.forEach((task) => {
		console.log(task);
		let commingDueDate = DateTime.fromISO(task.commingDueDate!);
		if (task.completedAt) {
			completedMap['Recently Completed'].data.push(task);
		}
		if (!task.dueDate && !task.completedAt) {
			tasksMap['No Due Date'].data.push(task);
		} else if (commingDueDate.hasSame(today, 'day')) {
			tasksMap['Today'].data.push(task);
		} else if (commingDueDate < today) {
			tasksMap['Overdue'].data.push(task);
		} else if (commingDueDate.hasSame(today, 'week')) {
			tasksMap['This Week'].data.push(task);
		} else if (commingDueDate <= today.endOf('week').plus({ week: 1 })) {
			tasksMap['Next Week'].data.push(task);
		} else if (commingDueDate.hasSame(today, 'month')) {
			tasksMap['This Month'].data.push(task);
		} else if (commingDueDate <= today.endOf('month').plus({ month: 1 })) {
			tasksMap['Next Month'].data.push(task);
		} else if (commingDueDate.hasSame(today, 'year')) {
			tasksMap['This Year'].data.push(task);
		} else if (commingDueDate <= today.endOf('year').plus({ year: 1 })) {
			tasksMap['Next Year'].data.push(task);
		} else if (commingDueDate <= today.plus({ year: 10 })) {
			tasksMap['Comming 10 years'].data.push(task);
		} else if (commingDueDate <= today.plus({ year: 100 })) {
			tasksMap['Far ahead'].data.push(task);
		} else {
			tasksMap["Somone else's problem"].data.push(task);
		}
	});

	let sections = {
		tasks: [] as sectionEntry[],
		completed: [] as sectionEntry[],
	};

	for (const [key, value] of Object.entries(tasksMap)) {
		if (value.data.length > 0) {
			sections.tasks.push({ title: key, data: value.data, order: value.order });
		}
	}

	for (const [key, value] of Object.entries(completedMap)) {
		if (value.data.length > 0) {
			sections.completed.push({ title: key, data: value.data, order: value.order });
		}
	}

	sections.tasks.sort((a, b) => a.order - b.order);
	sections.completed.sort((a, b) => a.order - b.order);

	return sections;
}
