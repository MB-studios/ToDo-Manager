import { FlatList, Pressable, RefreshControl, View, StyleSheet, SectionList } from 'react-native';
import { Card, Checkbox, Text } from 'react-native-paper';
import { Task } from 'api/types';
import LoadingIndicator from './LoadingIndicator';
import { router } from 'expo-router';
import { useRefreshByUser } from 'hooks/useRefreshByUser';
import { useRefreshOnFocus } from 'hooks/useRefreshOnFocus';
import { QueryObserverResult, useMutation, useQueryClient } from '@tanstack/react-query';
import { DateTime } from 'luxon';
import { updateTask } from 'api/paths/task';
import FillStyleSheet from 'styles/fill';
import { sectionEntry } from 'utils/formatSections';
import { setCompletion } from 'utils/taskFunctions';

export default function TaskList(
	tasks: sectionEntry[],
	isLoading: boolean,
	error: any,
	refetch: () => Promise<unknown>,
	completedList: boolean
) {
	const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
	useRefreshOnFocus(refetch);

	const redirectToTask = (task: Task) => {
		router.push(`task/${task._id}`);
	};

	const queryClient = useQueryClient();
	const updateCompletedMutation = useMutation({
		mutationFn: (task: Task) => {
			if (!task.completedAt) {
				task.completedAt = DateTime.now().toFormat("yyyy-MM-dd'T00:00:00.000Z'") as string;
				let dueDate = task.dueDate === '' ? undefined : DateTime.fromISO(task.dueDate as string);
				if (task.recurring && dueDate) {
					let today = DateTime.now().startOf('day');

					if (task.fixedRecurrance) {
						if (dueDate >= today) {
							task.commingDueDate = dueDate
								?.plus({ [task.recurringUnit as string]: task.recurringInterval })
								.toFormat("yyyy-MM-dd'T00:00:00.000Z'");
						} else {
							let diff = Math.ceil(today.diff(dueDate, task.recurringUnit as any).as(task.recurringUnit as any));
							task.commingDueDate = dueDate
								.plus({ [task.recurringUnit as string]: diff })
								.toFormat("yyyy-MM-dd'T00:00:00.000Z'");
						}
					} else {
						task.commingDueDate = today
							.plus({ [task.recurringUnit as string]: task.recurringInterval })
							.toFormat("yyyy-MM-dd'T00:00:00.000Z'");
					}
				}
			} else if (task.completedAt) {
				task.completedAt = undefined;
				task.commingDueDate = task.currentDueDate;
			}
			//console.log(setCompletion(task));
			return updateTask(task);
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['tasks']);
		},
	});

	const isChecked = (task: Task) => {
		if (completedList) {
			return !task.currentDueDate ||
				DateTime.fromISO(task.completedAt as string) < DateTime.fromISO(task.currentDueDate as string)
				? 'checked'
				: 'unchecked';
		} else {
			return DateTime.fromISO(task.completedAt as string) < DateTime.fromISO(task.commingDueDate as string)
				? 'checked'
				: 'unchecked';
		}
	};

	if (isLoading) {
		return LoadingIndicator({ message: 'Loading tasks...' });
	} else if (error) {
		return <Text>Error getting data</Text>;
	} else {
		return (
			<View style={FillStyleSheet.fillWithMargins}>
				<SectionList
					sections={tasks}
					refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}
					ListFooterComponent={<View style={{ height: 80 }} />}
					renderItem={({ item }) => (
						<Pressable onPress={() => redirectToTask(item)}>
							<Card style={styles.card}>
								<Card.Title
									title={<Text variant="titleMedium">{item.title}</Text>}
									subtitle={<Text variant="bodyMedium">{item.description}</Text>}
									right={() => {
										//console.log(item);
										return (
											<View style={styles.checkBoxView}>
												<Checkbox status={isChecked(item)} onPress={() => updateCompletedMutation.mutate(item)} />
											</View>
										);
									}}
								/>
							</Card>
						</Pressable>
					)}
					renderSectionHeader={({ section: { title } }) => (
						<View style={{ alignItems: 'center' }}>
							<Text>{title}</Text>
						</View>
					)}
				/>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	card: {
		marginVertical: 8,
	},
	checkBoxView: {
		aspectRatio: 1,
		flex: 1,
		margin: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
