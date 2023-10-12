import { View, StyleSheet } from 'react-native';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { HelperText, TextInput } from 'react-native-paper';
type Props = {
	control: Control<any>;
	name: string;
	description: string;
	rules?: RegisterOptions;
	multiline?: boolean;
	numberOfLines?: number;
};

export const TextInputWithErrors = ({
	control,
	name,
	description,
	rules = {},
	multiline = false,
	numberOfLines = 1,
}: Props) => (
	<View style={styles.input}>
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field, formState }) => (
				<View style={styles.input}>
					<TextInput
						label={description}
						mode="outlined"
						multiline={multiline}
						numberOfLines={numberOfLines}
						value={field.value}
						onChangeText={(value) => field.onChange(value)}
						onBlur={field.onBlur}
					/>
					<ErrorMessage
						errors={formState.errors}
						name={name}
						render={({ message }) => <HelperText type="error">{message}</HelperText>}
					/>
				</View>
			)}
		/>
	</View>
);

const styles = StyleSheet.create({
	input: {
		marginBottom: 10,
	},
});
