import { Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import { View } from 'react-native';
import TaskForm from 'components/TaskForm';
import FillStyleSheet from 'styles/fill';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTask } from 'api/paths/task';
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
			<TaskForm task={task} backToTask={true} />
		</View>
	);
	/*
	const params = useLocalSearchParams<{
		_id: string;
		title: string;
		description: string;
	}>();

	const onDataLoaded = (data: Task) => {
		setValue('title', data.title);
		setValue('description', data.description);
		setValue('completed', data.completed);
	};

	const { isLoading, error, data, refetch } = getTask(params._id || '', { ...params }, onDataLoaded);

	const { control, getValues, formState, handleSubmit, reset, setValue } = useForm<Task>({
		defaultValues: data,
		mode: 'all',
	});
	const redirect = () => {
		router.back();
	};

	const mutation = upsertTask(getValues, redirect);

	const onSubmit = () => {
		mutation.mutate();
	};

	/*
	const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
	useRefreshOnFocus(refetch);
	const { _id, title, description } = params;
	*/
	/*
	const navigation = useNavigation();
	useEffect(() => {
		const unsubscribe = navigation.addListener('beforeRemove', (e) => {
			if (formState.isDirty && !formState.isSubmitted) {
				e.preventDefault();
				Alert.alert(
					'Discard changes?',
					'You have unsaved changes. Would you like to stay?',
					[
						{
							text: 'No',
							onPress: () => {
								navigation.dispatch(e.data.action);
							},
						},
						{
							text: 'Yes',
							onPress: () => {},
						},
					],
					{ cancelable: true }
				);
			}
		});

		return unsubscribe;
	}, [formState.isDirty, formState.isSubmitted, navigation]);

	return (
		<View style={FillStyleSheet.fillWithMargins}>
			<Stack.Screen options={{ title: 'Edit task', animation: 'none' }} />
			<TaskForm
				control={control}
				onSubmit={handleSubmit(onSubmit)}
				formState={formState}
				reset={() => reset({}, { keepValues: true })}
			/>
		</View>
	);
	*/
}
