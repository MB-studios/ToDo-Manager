import { useReducer } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { useRefreshByUser } from 'hooks/useRefreshByUser';
import { useRefreshOnFocus } from 'hooks/useRefreshOnFocus';
import { Task, getTask } from 'hooks/queries';
import TaskForm from 'components/TaskForm';
import { set } from 'react-hook-form';

export default function EditTask() {
	const params = useLocalSearchParams<{
		_id: string;
		title: string;
		description: string;
	}>();

	let setValueFunction: Function;
	const getValueSetter = (setValue: Function) => {
		setValueFunction = setValue;
	};

	const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
	const onDataLoaded = (data: any) => {
		Object.keys(data).forEach((key) => {
			setValueFunction(key, data[key]);
		});
	};

	const { isLoading, error, data, refetch } = getTask(params._id || '', { ...params }, onDataLoaded);

	const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
	useRefreshOnFocus(refetch);
	const { _id, title, description } = params;

	return (
		<View>
			<Stack.Screen options={{ title: 'Edit task' }} />
			<TaskForm task={{ ...data }} getValueSetter={getValueSetter} />
		</View>
	);
}
