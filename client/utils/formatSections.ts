import { DateTime } from 'luxon';
import { Task } from 'api/types';

export default function formatSections({ tasks }: { tasks: Partial<Task>[] }) {
	interface sectionEntry {
		order: number;
		data: Partial<Task>[];
	}

	interface sectionMap {
		[sectionName: string]: sectionEntry;
	}

	let sections: sectionMap = {
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

	const today = DateTime.fromISO('2023-10-14');
	tasks.forEach((task) => {
		let dueDate = DateTime.fromISO(task.dueDate!);
		if (!task.dueDate) {
			sections['No Due Date'].data.push(task);
		} else if (dueDate.hasSame(today, 'day')) {
			sections['Today'].data.push(task);
		} else if (dueDate < today) {
			sections['Overdue'].data.push(task);
		} else if (dueDate.hasSame(today, 'week')) {
			sections['This Week'].data.push(task);
		} else if (dueDate <= today.endOf('week').plus({ week: 1 })) {
			sections['Next Week'].data.push(task);
		} else if (dueDate.hasSame(today, 'month')) {
			sections['This Month'].data.push(task);
		} else if (dueDate <= today.endOf('month').plus({ month: 1 })) {
			sections['Next Month'].data.push(task);
		} else if (dueDate.hasSame(today, 'year')) {
			sections['This Year'].data.push(task);
		} else if (dueDate <= today.endOf('year').plus({ year: 1 })) {
			sections['Next Year'].data.push(task);
		} else if (dueDate <= today.plus({ year: 10 })) {
			sections['Comming 10 years'].data.push(task);
		} else if (dueDate <= today.plus({ year: 100 })) {
			sections['Far ahead'].data.push(task);
		} else {
			sections["Somone else's problem"].data.push(task);
		}
	});

	console.log(sections);
}
