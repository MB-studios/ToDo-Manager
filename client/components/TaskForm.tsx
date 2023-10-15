import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { Button, Snackbar, Portal } from 'react-native-paper';
import { TextInputWithErrors } from 'components/TextInputWithErrors';
import FillStyleSheet from 'styles/fill';
import { Task } from 'api/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { upsertTask } from 'api/paths/task';
import { router } from 'expo-router';

const TaskForm = ({ task, backToTask }: { task?: Task; backToTask?: boolean }) => {
	const queryClient = useQueryClient();
	const saveTaskMutation = useMutation({
		mutationFn: (task: Task) => upsertTask(task),
		onSuccess: (task: Task) => {
			queryClient.invalidateQueries(['tasks']);
			if (backToTask) {
				router.back();
			} else {
				router.push('');
			}
		},
	});

	const { control, formState, reset, handleSubmit } = useForm<Task>({
		defaultValues: {
			title: task?.title || '',
			description: task?.description || '',
		},
		mode: 'all',
	});

	return (
		<View style={FillStyleSheet.fill}>
			<View style={FillStyleSheet.fill}>
				<TextInputWithErrors
					control={control}
					name="title"
					description="Title"
					rules={{
						required: 'Title is required',
					}}
				/>
				<View style={FillStyleSheet.fill}>
					<TextInputWithErrors
						control={control}
						name="description"
						description="Description"
						multiline={true}
						numberOfLines={5}
					/>
				</View>
				<Button mode="contained" onPress={handleSubmit((task) => saveTaskMutation.mutate(task))}>
					{' '}
					Save
				</Button>
			</View>
			<Portal>
				<Snackbar
					visible={formState.isSubmitted && !formState.isValid}
					onDismiss={() => reset()}
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
