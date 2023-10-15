import { FlatList, Pressable, RefreshControl, View, StyleSheet } from 'react-native';
import { Card, Checkbox, Text } from 'react-native-paper';
import { Task } from 'api/types';
import LoadingIndicator from './LoadingIndicator';
import { router } from 'expo-router';
import { useRefreshByUser } from 'hooks/useRefreshByUser';
import { useRefreshOnFocus } from 'hooks/useRefreshOnFocus';
import { QueryObserverResult, useMutation, useQueryClient } from '@tanstack/react-query';
import { upsertTask } from 'api/paths/task';

export default function TaskList(tasks: Task[], isLoading: boolean, error: any, refetch: () => Promise<unknown>) {
	const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
	useRefreshOnFocus(refetch);

	const redirectToTask = (task: Task) => {
		router.push(`task/${task._id}`);
	};

	const queryClient = useQueryClient();
	const updateCompletedMutation = useMutation({
		mutationFn: (task: Task) => upsertTask({ ...task, completed: !task.completed }),
		onSuccess: () => {
			queryClient.invalidateQueries(['tasks']);
		},
	});

	if (isLoading) {
		return LoadingIndicator({ message: 'Loading tasks...' });
	} else if (error) {
		return <Text>Error getting data</Text>;
	} else {
		return (
			<FlatList
				data={tasks}
				refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}
				ListFooterComponent={<View style={{ height: 80 }} />}
				renderItem={({ item }) => (
					<Pressable onPress={() => redirectToTask(item)}>
						<Card style={styles.card}>
							<Card.Title
								title={<Text variant="titleMedium">{item.title}</Text>}
								subtitle={<Text variant="bodyMedium">{item.description}</Text>}
								right={() => (
									<View style={styles.checkBoxView}>
										<Checkbox
											status={item.completed ? 'checked' : 'unchecked'}
											onPress={() => updateCompletedMutation.mutate(item)}
										/>
									</View>
								)}
							/>
						</Card>
					</Pressable>
				)}
			/>
		);
	}
}
const styles = StyleSheet.create({
	card: {
		margin: 8,
	},
	checkBoxView: {
		aspectRatio: 1,
		flex: 1,
		margin: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
