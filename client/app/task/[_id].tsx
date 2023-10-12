import { router, Stack, useLocalSearchParams } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { Divider, IconButton, Switch, Text } from 'react-native-paper';
import { useRefreshByUser } from 'hooks/useRefreshByUser';
import { useRefreshOnFocus } from 'hooks/useRefreshOnFocus';
import { getTask } from 'hooks/queries';

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
});
