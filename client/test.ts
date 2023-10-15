import formatSections from 'utils/formatSections';

exports.default = () => {
	let data = [
		{
			id: 1,
			title: 'Today',
			dueDate: '2023-10-15T00:00:00.000Z',
		},
		{
			id: 2,
			title: 'Overdue',
			dueDate: '2023-10-14T00:00:00.000Z',
		},
		{
			id: 3,
			title: 'Tomorrow',
			dueDate: '2023-10-16T00:00:00.000Z',
		},
		{
			id: 4,
			title: 'In 5 days',
			dueDate: '2023-10-20T00:00:00.000Z',
		},
		{
			id: 5,
			title: 'In a year',
			dueDate: '2024-10-15T00:00:00.000Z',
		},
		{
			id: 6,
			title: 'No due date',
			dueDate: undefined,
		},
	];
	formatSections(data);
};
