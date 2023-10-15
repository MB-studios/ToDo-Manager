import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

export default function LoadingIndicator({ message = 'Loading...' }) {
	return (
		<View style={styles.activityIndicatorView}>
			<ActivityIndicator style={styles.activityIndicator} size="large" />
			<Text>{message}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	activityIndicatorView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	activityIndicator: {
		paddingBottom: 10,
	},
});
