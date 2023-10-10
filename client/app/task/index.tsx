import { Text, View } from 'react-native';
import { Stack } from 'expo-router';

export default function AddTask() {
	return (
		<View>
			<Stack.Screen options={{ title: 'Add task' }} />
			<Text>New task</Text>
		</View>
	);
}
