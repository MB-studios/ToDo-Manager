import { View, StyleSheet } from 'react-native';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { HelperText, TextInput } from 'react-native-paper';
type Props = {
	control: Control<any>;
	trigger: Function;
	name: string;
	description: string;
	rules?: RegisterOptions;
	multiline?: boolean;
	numberOfLines?: number;
	maxLength?: number;
	keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad';
};

export const TextInputWithErrors = ({
	control,
	trigger,
	name,
	description,
	rules = {},
	multiline = false,
	numberOfLines = 1,
	maxLength = undefined,
	keyboardType = 'default',
}: Props) => {
	const handleOnChangeText = (value: string, onChange: (...event: string[]) => void) => {
		onChange(value);
		trigger();
	};
	return (
		<View style={styles.input}>
			<Controller
				control={control}
				name={name}
				rules={rules}
				render={({ field: { onChange, value, onBlur }, formState }) => {
					return (
						<View style={styles.input}>
							<TextInput
								label={description}
								mode="outlined"
								multiline={multiline}
								numberOfLines={numberOfLines}
								value={value}
								onChangeText={(value: string) => {
									if (keyboardType === 'numeric') value = value.replace(/[^0-9]/g, '');
									handleOnChangeText(value, onChange);
									trigger(name);
								}}
								onBlur={onBlur}
								maxLength={maxLength}
								keyboardType={keyboardType}
							/>
							<ErrorMessage
								errors={formState.errors}
								name={name}
								render={({ message }) => <HelperText type="error">{message}</HelperText>}
							/>
						</View>
					);
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		marginVertical: 5,
	},
});
