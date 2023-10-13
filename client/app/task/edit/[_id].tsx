import { useReducer, useEffect } from 'react';
import { router } from 'expo-router';
import { Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import { View, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { useRefreshByUser } from 'hooks/useRefreshByUser';
import { useRefreshOnFocus } from 'hooks/useRefreshOnFocus';
import { Task, getTask, upsertTask } from 'hooks/queries';
import TaskForm from 'components/TaskForm';

export default function EditTask() {
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
							text: 'Yes',
							onPress: () => {},
						},
						{
							text: 'No',
							onPress: () => {
								navigation.dispatch(e.data.action);
							},
						},
					],
					{ cancelable: true }
				);
			}
		});

		return unsubscribe;
	}, [formState.isDirty, formState.isSubmitted, navigation]);

	return (
		<View>
			<Stack.Screen options={{ title: 'Edit task' }} />
			<TaskForm
				control={control}
				onSubmit={handleSubmit(onSubmit)}
				formState={formState}
				reset={() => reset({}, { keepValues: true })}
			/>
		</View>
	);
}
