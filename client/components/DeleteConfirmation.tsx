import { Alert, Platform } from 'react-native';

export default function DeleteConfirmation(title: string, description: string, confirmed: Function) {
	if (Platform.OS === 'web') {
		if (window.confirm(`${title}\n\n${description}`)) {
			confirmed();
		}
	} else {
		Alert.alert(
			title,
			description,
			[
				{
					text: 'No',
					style: 'cancel',
					onPress: () => {},
				},
				{
					text: 'Yes',
					onPress: () => {
						confirmed();
					},
				},
			],
			{ cancelable: true }
		);
	}
}
