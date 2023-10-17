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

export default function Tasks() {
	const [tasks, setTasks] = React.useState<Task[]>([]);
	const [completed, setCompleted] = React.useState<Task[]>([]);
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ['tasks'],
		queryFn: getTasks,
		onSuccess: (data) => {
			setTasks(data.filter((task) => !task.completed));
			setCompleted(data.filter((task) => task.completed));
		},
	});
	useRefreshOnFocus(refetch);

	let sections = formatSections(data);

	const renderScene = BottomNavigation.SceneMap({
		tasks: () => TaskList(sections.tasks, isLoading, error, refetch),
		completed: () => TaskList(sections.completed, isLoading, error, refetch),
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
