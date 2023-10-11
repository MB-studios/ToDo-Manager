import * as React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { View, Text } from 'react-native';
import { router, Stack } from 'expo-router';
import { Task, getTasks } from '../hooks/queries';
import { useRefreshByUser } from '../hooks/useRefreshByUser';
import { useRefreshOnFocus } from '../hooks/useRefreshOnFocus';
import { IconButton } from 'react-native-paper';
import { TaskCard } from '../components/TaskCard';
import { AddButton } from '../components/AddButton';

export default function Tasks() {
	const { isLoading, error, data, refetch } = getTasks({ params: {} });
	const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
	useRefreshOnFocus(refetch);

	const onListItemPress = React.useCallback(() => console.log('item pressed'), []);

	const renderItem = React.useCallback(
		({ item }: { item: Task }) => {
			return <TaskCard item={item} onPress={onListItemPress} />;
		},
		[onListItemPress]
	);

	if (isLoading) return <Text>Loading...</Text>;

	if (error) return <Text>Error</Text>;

	return (
		<View>
			<Stack.Screen
				options={{
					title: 'Tasks',
					headerRight: () => <IconButton icon="magnify" onPress={() => console.log('search for tasks')} />,
				}}
			/>
			<FlatList
				data={data}
				renderItem={renderItem}
				keyExtractor={(item) => item._id}
				refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}
			></FlatList>
			<AddButton onPress={() => router.push('/task')} />
		</View>
	);
}
