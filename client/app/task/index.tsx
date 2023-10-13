import { useEffect } from 'react';
import { Stack, useNavigation } from 'expo-router';
import { router } from 'expo-router';
import { View, Alert, StyleSheet } from 'react-native';
import TaskForm from 'components/TaskForm';
import { useForm } from 'react-hook-form';
import { Task, upsertTask } from 'hooks/queries';
import FillStyleSheet from 'styles/fill';

export default function AddTask() {
	const { control, getValues, formState, handleSubmit, reset, setValue } = useForm<Task>({
		mode: 'all',
	});

	const redirect = () => {
		router.back();
	};

	const mutation = upsertTask(getValues, redirect);

	const onSubmit = () => {
		mutation.mutate();
	};

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
			<Stack.Screen options={{ title: 'Add task', animation: 'none' }} />
			<TaskForm
				control={control}
				onSubmit={handleSubmit(onSubmit)}
				formState={formState}
				reset={() => reset({}, { keepValues: true })}
			/>
		</View>
	);
}
