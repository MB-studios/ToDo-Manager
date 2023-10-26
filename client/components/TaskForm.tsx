import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Snackbar, Portal, Text, Switch, Divider } from 'react-native-paper';
import { TextInputWithErrors } from 'components/TextInputWithErrors';
import FillStyleSheet from 'styles/fill';
import { Task } from 'api/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { DatePickerModal } from 'react-native-paper-dates';
import { enGB, registerTranslation } from 'react-native-paper-dates';
registerTranslation('en-GB', enGB);
import DropDown from 'react-native-paper-dropdown';
import React from 'react';
import { DateTime } from 'luxon';

type FormValues = {
	_id?: string;
	title: string;
	description: string;
	dueDate: string;
	recurring: boolean;
	recurringInterval: string;
	recurringUnit: string;
	fixedRecurrance: boolean;
};

const FormData = z
	.object({
		_id: z.string().optional(),
		title: z.string().min(1, 'Title is required'),
		description: z.string().optional(),
		dueDate: z
			.string()
			.regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$|^$/, 'Date must be in format YYYY-MM-DD')
			.optional(),
		recurring: z.boolean(),
		recurringInterval: z.string().optional(),
		recurringUnit: z.string().optional(),
		fixedRecurrance: z.boolean(),
	})
	.superRefine((values, ctx) => {
		if (values.recurring && !values.dueDate) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Due date is required for recurring tasks',
				path: ['dueDate'],
			});
		}
	});

type FormData = z.infer<typeof FormData>;

const TaskForm = ({ mutationFn, task, backToTask }: { mutationFn: Function; task?: Task; backToTask?: boolean }) => {
	const queryClient = useQueryClient();
	const saveTaskMutation = useMutation({
		mutationFn: (task: Partial<Task>) => mutationFn(task),
		onSuccess: () => {
			queryClient.invalidateQueries(['tasks']);
			if (backToTask) {
				router.back();
			} else {
				router.push('');
			}
		},
	});

	const { control, trigger, formState, reset, handleSubmit, setValue, watch } = useForm<FormValues>({
		defaultValues: {
			_id: task?._id || undefined,
			title: task?.title || '',
			description: task?.description || '',
			dueDate: DateTime.fromISO(task?.dueDate || '').toISODate() || '',
			recurring: task?.recurring || false,
			recurringInterval: task?.recurringInterval?.toString() || '',
			recurringUnit: task?.recurringUnit || '',
			fixedRecurrance: task?.fixedRecurrance || false,
		},
		resolver: zodResolver(FormData),
		mode: 'all',
	});
	const [dueDatePickerOpen, setDueDatePickerOpen] = React.useState(false);
	const [showRecurringUnitDropDown, setShowRecurringUnitDropDown] = React.useState(false);

	const dateForDatePicker = () => {
		if (task?.dueDate) {
			return new Date(task.dueDate);
		} else {
			return undefined;
		}
	};

	const recurringUnitsList = [
		{ label: 'Days', value: 'days' },
		{ label: 'Weeks', value: 'weeks' },
		{ label: 'Months', value: 'months' },
		{ label: 'Years', value: 'years' },
	];

	return (
		<View style={FillStyleSheet.fill}>
			<View style={FillStyleSheet.fill}>
				<TextInputWithErrors control={control} trigger={trigger} name="title" description="Title" />
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<View style={{ flex: 1 }}>
						<TextInputWithErrors control={control} trigger={trigger} rules={{}} name="dueDate" description="Due date" />
					</View>
					<Button icon="calendar" onPress={() => setDueDatePickerOpen(true)} mode="text">
						Select
					</Button>
				</View>
				<Divider />
				<View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
					<Text style={{ flex: 1 }} variant="titleLarge">
						Recurring
					</Text>
					<Switch
						value={watch('recurring')}
						onValueChange={() => {
							setValue('recurring', !watch('recurring'));
							trigger('dueDate');
						}}
					/>
				</View>
				{watch('recurring') && (
					<View>
						<View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
							<Text style={{ flex: 1 }} variant="titleLarge">
								Repeat every
							</Text>
							<TextInputWithErrors
								control={control}
								trigger={trigger}
								name="recurringInterval"
								description="Interval"
								keyboardType="numeric"
							/>
							<DropDown
								label="Unit"
								mode="outlined"
								visible={showRecurringUnitDropDown}
								showDropDown={() => setShowRecurringUnitDropDown(true)}
								onDismiss={() => setShowRecurringUnitDropDown(false)}
								value={watch('recurringUnit')}
								setValue={(value) => {
									setValue('recurringUnit', value);
								}}
								list={recurringUnitsList}
							/>
						</View>
						<View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
							<Text style={{ flex: 1 }} variant="titleLarge">
								Fixed recurrance
							</Text>
							<Switch
								value={watch('fixedRecurrance')}
								onValueChange={() => {
									setValue('fixedRecurrance', !watch('fixedRecurrance'));
								}}
							/>
						</View>
					</View>
				)}
				<Divider />
				<View style={FillStyleSheet.fill}>
					<TextInputWithErrors
						control={control}
						trigger={trigger}
						name="description"
						description="Description"
						multiline={true}
						numberOfLines={5}
					/>
				</View>
				<Button
					mode="contained"
					onPress={handleSubmit((task) => {
						let dueDate = task.dueDate === '' ? undefined : DateTime.fromISO(task.dueDate);
						let dueDateString = dueDate?.toFormat("yyyy-MM-dd'T00:00:00.000Z'");
						let recurringInterval = task.recurringInterval === '' ? undefined : parseInt(task.recurringInterval);
						let currentDueDate: string | undefined;
						if (task.recurring && dueDate) {
							let today = DateTime.now().startOf('day');
							if (dueDate >= today) {
								currentDueDate = dueDateString;
							} else {
								let diff = Math.ceil(today.diff(dueDate, task.recurringUnit as any).as(task.recurringUnit as any));
								currentDueDate = dueDate.plus({ [task.recurringUnit]: diff }).toFormat("yyyy-MM-dd'T00:00:00.000Z'");
							}
						} else {
							currentDueDate = dueDateString;
						}
						saveTaskMutation.mutate({
							...task,
							dueDate: dueDateString,
							recurringInterval,
							currentDueDate,
							commingDueDate: currentDueDate,
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
						trigger('dueDate');
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
