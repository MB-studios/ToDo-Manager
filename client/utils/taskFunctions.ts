import { Task } from 'api/types';
import { DateTime } from 'luxon';

export function setCompletion(task: Task) {
	let today = DateTime.now();
	let dueDate = DateTime.fromISO(task.dueDate!);

	if (!task.completedAt) {
		// Set task to completed
		task.completedAt = DBFormat(today);

		if (task.recurring) {
			// Handle dates of recurring task
			task.currentDueDate = task.commingDueDate;
			if (task.fixedRecurrance) {
				// Set dates from a fixes schedule
				task.commingDueDate = DateTime.fromISO(task.currentDueDate as string)
					.plus({ [task.recurringUnit as string]: task.recurringInterval })
					.toFormat("yyyy-MM-dd'T00:00:00.000Z'");
			} else {
				// Set dates based on completion time
				task.commingDueDate = DBFormat(today.plus({ [task.recurringUnit as string]: task.recurringInterval }));
			}
		}
	} else {
		// Set task to not completed
		task.completedAt = undefined;
		if (task.recurring) {
			if (dueDate >= today) {
				// Set current due date to the given due date
				task.currentDueDate = task.dueDate;
			} else {
				// Calculate the latest overdue due date
				task.commingDueDate = DBFormat(
					dueDate.plus({
						[task.recurringUnit as string]: Math.ceil(
							today.diff(dueDate, task.recurringUnit as any).as(task.recurringUnit as any)
						),
					})
				);
			}
		} else {
			task.commingDueDate = task.dueDate;
		}
		task.commingDueDate = task.currentDueDate;
	}
	return task;
}

function DBFormat(date: DateTime) {
	return date.toFormat("yyyy-MM-dd'T00:00:00.000Z'");
}
