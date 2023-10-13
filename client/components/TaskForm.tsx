import { View, StyleSheet } from 'react-native';
import { Control, FormState, useForm } from 'react-hook-form';
import { Button, Snackbar, Portal } from 'react-native-paper';
import { components } from 'lib/api/v1';
import { TextInputWithErrors } from 'components/TextInputWithErrors';

export type Task = components['schemas']['task'];

const TaskForm = ({
	control,
	onSubmit,
	formState,
	reset,
}: {
	control: Control<any>;
	onSubmit: Function;
	formState: FormState<any>;
	reset: Function;
}) => {
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
				<Button mode="contained" onPress={() => onSubmit()}>
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
