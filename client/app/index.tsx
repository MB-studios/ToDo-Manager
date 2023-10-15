import * as React from 'react';
import { View } from 'react-native';
import { Stack, router } from 'expo-router';
import { BottomNavigation, IconButton } from 'react-native-paper';
import { useQuery } from '@tanstack/react-query';
import { useRefreshOnFocus } from 'hooks/useRefreshOnFocus';
import { getTasks } from 'api/paths/tasks';
import { Task } from 'api/types';
import fill from 'styles/fill';
import TaskList from 'components/TasksList';
import { AddButton } from 'components/AddButton';
import formatSections from 'utils/formatSections';

const data = [
	{
		_id: 'a',
		title: 'Today',
		dueDate: '2023-10-14T00:00:00.000Z',
	},
	{
		_id: 'b',
		title: 'Overdue',
		dueDate: '2023-10-13T00:00:00.000Z',
	},
	{
		_id: 'c',
		title: 'Tomorrow',
		dueDate: '2023-10-15T00:00:00.000Z',
	},
	{
		_id: 'd',
		title: 'Next monday',
		dueDate: '2023-10-16T00:00:00.000Z',
	},
	{
		_id: 'd',
		title: 'Next Sunday',
		dueDate: '2023-10-22T00:00:00.000Z',
	},
	{
		_id: 'd',
		title: 'Last day this month',
		dueDate: '2023-10-31T00:00:00.000Z',
	},
	{
		_id: 'd',
		title: 'First day next month',
		dueDate: '2023-11-01T00:00:00.000Z',
	},
	{
		_id: 'd',
		title: 'Last day next month',
		dueDate: '2023-11-30T00:00:00.000Z',
	},
	{
		_id: 'd',
		title: 'Last day this year',
		dueDate: '2023-12-31T00:00:00.000Z',
	},
	{
		_id: 'd',
		title: 'First day next year',
		dueDate: '2024-01-01T00:00:00.000Z',
	},
	{
		_id: 'd',
		title: 'Last day next year',
		dueDate: '2024-12-31T00:00:00.000Z',
	},
	{
		_id: 'd',
		title: 'In 10 years',
		dueDate: '2033-10-13T00:00:00.000Z',
	},
	{
		_id: 'f',
		title: 'No due date',
		dueDate: undefined,
	},
];

export default function Tasks() {
	const [tasks, setTasks] = React.useState<Task[]>([]);
	const [completed, setCompleted] = React.useState<Task[]>([]);
	const { isLoading, error, refetch } = useQuery({
		queryKey: ['tasks'],
		queryFn: getTasks,
		onSuccess: (data) => {
			setTasks(data.filter((task) => !task.completed));
			setCompleted(data.filter((task) => task.completed));
		},
	});
	useRefreshOnFocus(refetch);

	//let tasksTemp = formatSections(tasks);

	const renderScene = BottomNavigation.SceneMap({
		tasks: () => TaskList(tasks, isLoading, error, refetch),
		completed: () => TaskList(completed, isLoading, error, refetch),
	});

	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{
			key: 'tasks',
			title: 'Tasks',
			focusedIcon: 'checkbox-multiple-blank',
			unfocusedIcon: 'checkbox-multiple-blank-outline',
		},
		{
			key: 'completed',
			title: 'Completed',
			focusedIcon: 'checkbox-multiple-marked',
			unfocusedIcon: 'checkbox-multiple-outline',
		},
	]);

	return (
		<View style={fill.fill}>
			<Stack.Screen
				options={{
					title: 'Tasks',
					animation: 'none',
					headerRight: () => <IconButton icon="magnify" onPress={() => console.log('search for tasks')} />,
				}}
			/>
			<BottomNavigation navigationState={{ index, routes }} onIndexChange={setIndex} renderScene={renderScene} />
			<AddButton
				onPress={() => {
					router.push('/task');
					//formatSections({ tasks: data });
				}}
			/>
		</View>
	);
}
