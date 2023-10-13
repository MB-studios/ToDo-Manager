import { router, Stack, useLocalSearchParams } from 'expo-router';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Divider, IconButton, MD3Colors, MD3DarkTheme, Switch, Text } from 'react-native-paper';
import { useRefreshByUser } from 'hooks/useRefreshByUser';
import { useRefreshOnFocus } from 'hooks/useRefreshOnFocus';
import { getTask, deleteTask } from 'hooks/queries';

export default function TaskScreen() {
	const params = useLocalSearchParams<{
		_id: string;
		title: string;
		description: string;
		completed: string;
	}>();

	const { isLoading, error, data, refetch } = getTask(params._id || '', {
		...params,
		completed: params.completed === 'true',
	});
	const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
	useRefreshOnFocus(refetch);

	const deleteConfirmation = () => {
		Alert.alert(
			'Delete task?',
			'Are you sure you want to delete this task?',
			[
				{
					text: 'Yes',
					onPress: () => {
						deleteMutation.mutate();
					},
				},
				{
					text: 'No',
					onPress: () => {},
				},
			],
			{ cancelable: true }
		);
	};

	const redirect = () => router.push({ pathname: '' });

	const deleteMutation = deleteTask(data?._id || '', redirect);

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					title: data?.title,
					headerRight: () => (
						<IconButton
							icon="lead-pencil"
							onPress={() => router.push({ pathname: `task/edit/${params._id}`, params: data })}
						/>
					),
				}}
			/>
			<View>
				<View style={styles.row}>
					<Text variant="titleLarge">Task completed</Text>
					<Switch value={data?.completed} onValueChange={() => console.log('Change completed status')} />
				</View>
				<Divider />
				<View style={styles.row}>
					<Text variant="titleLarge">Due date</Text>
					<Text variant="bodyLarge">No due date</Text>
				</View>
				<Divider />
				<View style={styles.row}>
					<Text variant="bodyLarge">{data?.description}</Text>
				</View>
				<Divider />
				<View style={styles.row}>
					<Button
						mode="contained"
						style={styles.deleteButton}
						buttonColor={MD3Colors.error40}
						onPress={deleteConfirmation}
					>
						Delete task
					</Button>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		margin: 10,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginVertical: 10,
	},
	deleteButton: {
		flex: 1,
		colors: { primary: 'red' },
	},
});
