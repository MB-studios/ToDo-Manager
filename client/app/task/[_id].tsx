import { router, Stack, useLocalSearchParams } from 'expo-router';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Button, Divider, IconButton, MD3Colors, MD3DarkTheme, Switch, Text } from 'react-native-paper';
import { useRefreshByUser } from 'hooks/useRefreshByUser';
import { useRefreshOnFocus } from 'hooks/useRefreshOnFocus';
import FillStyleSheet from 'styles/fill';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTask } from 'api/paths/task';
import { Task } from 'api/types';
import { deleteTask } from 'api/paths/task';
import DeleteConfirmation from 'components/DeleteConfirmation';
import React from 'react';
import LoadingIndicator from 'components/LoadingIndicator';
const { DateTime } = require('luxon');

export default function TaskScreen() {
	const { _id } = useLocalSearchParams<{
		_id: string;
	}>() as { _id: string };

	const queryKey = ['tasks', _id];
	const [queryEnabled, setQueryEnabled] = React.useState(true);
	const { data, isLoading, error } = useQuery<Task, Error>({
		queryKey,
		queryFn: () => getTask({ _id }),
		enabled: queryEnabled,
	});

	const queryClient = useQueryClient();
	const deleteTaskMutation = useMutation({
		mutationFn: (_id: string) => deleteTask(_id),
		onMutate: () => {
			setQueryEnabled(false);
		},
		onSuccess: async () => {
			queryClient.removeQueries(queryKey);
			await queryClient.refetchQueries({ queryKey: ['tasks'], exact: true });
			router.push('');
		},
		onError: () => {
			setQueryEnabled(true);
		},
	});

	return (
		<View style={FillStyleSheet.fillWithMargins}>
			<Stack.Screen
				options={{
					title: data?.title || 'Task loading...',
					animation: 'none',
					headerRight: () => (
						<IconButton
							icon="lead-pencil"
							onPress={() => router.push({ pathname: `task/edit/${_id}`, params: data })}
						/>
					),
				}}
			/>
			<View style={FillStyleSheet.fill}>
				{isLoading ? (
					<LoadingIndicator message="Loading tasks..." />
				) : error ? (
					<View style={FillStyleSheet.fill}>
						<Text>Error loading task</Text>
					</View>
				) : (
					<View style={FillStyleSheet.fill}>
						<View style={FillStyleSheet.fillHorizontalWithMargins}>
							<Text variant="titleLarge">Task completed</Text>
							<Switch value={data?.completed} onValueChange={() => console.log('Change completed status')} />
						</View>
						<Divider />
						<View style={FillStyleSheet.fillHorizontalWithMargins}>
							<Text variant="titleLarge">Due date</Text>
							<Text variant="bodyLarge">
								{data?.dueDate ? DateTime.fromISO(data.dueDate).toISODate() : 'No due date'}
							</Text>
						</View>
						<Divider />
						<ScrollView style={FillStyleSheet.fillWithVerticalMargins}>
							<Text variant="bodyLarge">{data?.description}</Text>
						</ScrollView>
						<View>
							<Button
								mode="contained"
								buttonColor={MD3Colors.error40}
								textColor={MD3Colors.error90}
								onPress={() =>
									DeleteConfirmation('Delete task?', 'Are you sure you want to delete this task?', () =>
										deleteTaskMutation.mutate(_id)
									)
								}
							>
								Delete task
							</Button>
						</View>
					</View>
				)}
			</View>
		</View>
	);
}
