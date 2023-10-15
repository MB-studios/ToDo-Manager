import { View } from 'react-native';
import { get, useForm } from 'react-hook-form';
import { Button, Snackbar, Portal, TextInput } from 'react-native-paper';
import { TextInputWithErrors } from 'components/TextInputWithErrors';
import FillStyleSheet from 'styles/fill';
import { Task } from 'api/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { upsertTask } from 'api/paths/task';
import { router } from 'expo-router';
import { DatePickerModal } from 'react-native-paper-dates';
import { enGB, registerTranslation } from 'react-native-paper-dates';
registerTranslation('en-GB', enGB);
import React from 'react';
import { DateTime } from 'luxon';

type FormValues = {
	_id?: string;
	title: string;
	description: string;
	dueDate: string;
};

const TaskForm = ({ task, backToTask }: { task?: Task; backToTask?: boolean }) => {
	const queryClient = useQueryClient();
	const saveTaskMutation = useMutation({
		mutationFn: (task: Task) => upsertTask(task),
		onSuccess: (task: Task) => {
			queryClient.invalidateQueries(['tasks']);
			if (backToTask) {
				console.log('back to task');
				router.back();
			} else {
				router.push('');
			}
		},
	});

	const { control, register, formState, reset, handleSubmit, getValues, setValue } = useForm<FormValues>({
		defaultValues: {
			_id: task?._id || undefined,
			title: task?.title || '',
			description: task?.description || '',
			dueDate: DateTime.fromISO(task?.dueDate || '').toISODate() || '',
		},
		mode: 'all',
	});
	const [dueDatePickerOpen, setDueDatePickerOpen] = React.useState(false);

	console.log(getValues());

	const dateForDatePicker = () => {
		if (task?.dueDate) {
			return new Date(task.dueDate);
		} else {
			return undefined;
		}
	};

	let dueDateRegister = register('dueDate', {
		pattern: {
			value: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$|^$/,
			message: 'Date must be in format YYYY-MM-DD',
		},
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
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<View style={{ flex: 1 }}>
						<TextInputWithErrors
							control={control}
							name="dueDate"
							description="Due date"
							rules={{
								pattern: {
									value: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$|^$/,
									message: 'Date must be in format YYYY-MM-DD',
								},
							}}
						/>
					</View>
					<Button icon="calendar" onPress={() => setDueDatePickerOpen(true)} mode="text">
						Select
					</Button>
				</View>
				<View style={FillStyleSheet.fill}>
					<TextInputWithErrors
						control={control}
						name="description"
						description="Description"
						multiline={true}
						numberOfLines={5}
					/>
				</View>
				<Button
					mode="contained"
					onPress={handleSubmit((task) => {
						let dueDate =
							task.dueDate === '' ? undefined : DateTime.fromISO(task.dueDate).toFormat("yyyy-MM-dd'T00:00:00.000Z'");
						saveTaskMutation.mutate({
							...task,
							dueDate,
						});
					})}
				>
					{' '}
					Save
				</Button>
			</View>

			<Portal>
				<DatePickerModal
					locale="en-GB"
					mode="single"
					visible={dueDatePickerOpen}
					onDismiss={() => setDueDatePickerOpen(false)}
					date={dateForDatePicker()}
					onConfirm={(params) => {
						if (params.date !== undefined) {
							setValue('dueDate', DateTime.fromJSDate(params.date).toISODate() || '');
						}
						setDueDatePickerOpen(false);
					}}
				/>
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

export default TaskForm;
