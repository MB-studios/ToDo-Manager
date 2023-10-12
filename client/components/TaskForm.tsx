import { router } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { Button, Snackbar, Portal } from 'react-native-paper';
import { upsertTask } from 'hooks/queries';
import { components } from 'lib/api/v1';
import { TextInputWithErrors } from 'components/TextInputWithErrors';

export type Task = components['schemas']['task'];

const TaskForm = ({ task, getValueSetter }: { task: Partial<Task>; getValueSetter?: Function }) => {
	const { control, getValues, formState, handleSubmit, reset, setValue } = useForm<Task>({
		defaultValues: task,
		mode: 'all',
	});

	getValueSetter && getValueSetter(setValue);

	const redirect = () => {
		task._id ? router.back() : router.push('');
	};

	const mutation = upsertTask(getValues, redirect);

	const onSubmit = () => {
		mutation.mutate();
	};

	return (
		<View>
			<View>
				<TextInputWithErrors
					control={control}
					name="title"
					description="Title"
					rules={{
						required: 'Title is required',
					}}
				/>
				<TextInputWithErrors
					control={control}
					name="description"
					description="Description"
					multiline={true}
					numberOfLines={5}
				/>
				<Button mode="contained" onPress={handleSubmit(onSubmit)}>
					{' '}
					Save
				</Button>
			</View>
			<Portal>
				<Snackbar
					visible={formState.isSubmitted && !formState.isValid}
					onDismiss={() => reset({}, { keepValues: true })}
					action={{
						label: 'close',
					}}
				>
					Please correct the fields above before saving
				</Snackbar>
			</Portal>
		</View>
	);
};

type FormValues = {
	_id: string;
	title: string;
	description: string;
};

export default TaskForm;
