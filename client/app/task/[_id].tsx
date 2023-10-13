import { router, Stack, useLocalSearchParams } from 'expo-router';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Divider, IconButton, MD3Colors, MD3DarkTheme, Switch, Text } from 'react-native-paper';
import { useRefreshByUser } from 'hooks/useRefreshByUser';
import { useRefreshOnFocus } from 'hooks/useRefreshOnFocus';
import { getTask, deleteTask } from 'hooks/queries';
import FillStyleSheet from 'styles/fill';

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
					text: 'No',
					style: 'cancel',
					onPress: () => {},
				},
				{
					text: 'Yes',
					onPress: () => {
						deleteMutation.mutate();
					},
				},
			],
			{ cancelable: true }
		);
	};

	const redirect = () => router.push({ pathname: '' });

	const deleteMutation = deleteTask(data?._id || '', redirect);

	return (
		<View style={FillStyleSheet.fillWithMargins}>
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
			<View style={FillStyleSheet.fill}>
				<View style={FillStyleSheet.fillHorizontalWithMargins}>
					<Text variant="titleLarge">Task completed</Text>
					<Switch value={data?.completed} onValueChange={() => console.log('Change completed status')} />
				</View>
				<Divider />
				<View style={FillStyleSheet.fillHorizontalWithMargins}>
					<Text variant="titleLarge">Due date</Text>
					<Text variant="bodyLarge">No due date</Text>
				</View>
				<Divider />
				<View style={FillStyleSheet.fill}>
					<Text variant="bodyLarge">{data?.description}</Text>
				</View>
				<Divider />
				<View style={FillStyleSheet.fillHorizontalWithMargins}>
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
	deleteButton: {
		flex: 1,
		flexDirection: 'row',
		colors: { primary: 'red' },
	},
});
