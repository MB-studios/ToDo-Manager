import * as React from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import { router, Stack } from 'expo-router';
import { Task, getTasks } from 'hooks/queries';
import { useRefreshByUser } from 'hooks/useRefreshByUser';
import { useRefreshOnFocus } from 'hooks/useRefreshOnFocus';
import { IconButton } from 'react-native-paper';
import { TaskCard } from 'components/TaskCard';
import { AddButton } from 'components/AddButton';
import LoadingIndicator from 'components/LoadingIndicator';

export default function Tasks() {
	const { isLoading, error, data, refetch } = getTasks({ params: {} });
	const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
	useRefreshOnFocus(refetch);

	const onListItemPress = React.useCallback(
		(task: Task) => router.push({ pathname: `task/${task._id}`, params: task }),
		[]
	);

	const renderItem = React.useCallback(
		({ item }: { item: Task }) => {
			return <TaskCard item={item} onPress={onListItemPress} />;
		},
		[onListItemPress]
	);

	const keyExtractor = React.useCallback((item: Task) => item._id || '', []);

	let content;
	if (isLoading) {
		content = LoadingIndicator({ message: 'Loading tasks...' });
	} else if (error) {
		content = <Text>Error getting data</Text>;
	} else {
		content = (
			<FlatList
				data={data}
				renderItem={renderItem}
				keyExtractor={keyExtractor}
				refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}
			></FlatList>
		);
	}

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					title: 'Tasks',
					headerRight: () => <IconButton icon="magnify" onPress={() => console.log('search for tasks')} />,
				}}
			/>
			{content}
			<AddButton onPress={() => router.push('/task')} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	activityIndicatorView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	activityIndicator: {
		alignSelf: 'center',
	},
});
