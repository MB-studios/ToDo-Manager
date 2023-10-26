import { Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import { View } from 'react-native';
import TaskForm from 'components/TaskForm';
import FillStyleSheet from 'styles/fill';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTask, updateTask } from 'api/paths/task';
import { Task } from 'api/types';

export default function EditTask() {
	const { _id } = useLocalSearchParams<{
		_id: string;
	}>() as { _id: string };

	const queryKey = ['tasks', _id];
	const { data: task } = useQuery<Task, Error>({
		queryKey,
		queryFn: () => getTask({ _id }),
	});

	return (
		<View style={FillStyleSheet.fillWithMargins}>
			<Stack.Screen options={{ title: 'Edit task', animation: 'none' }} />
			<TaskForm mutationFn={updateTask} task={task} backToTask={true} />
		</View>
	);
}
