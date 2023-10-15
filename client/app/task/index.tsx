import { Stack } from 'expo-router';
import { View } from 'react-native';
import TaskForm from 'components/TaskForm';
import FillStyleSheet from 'styles/fill';

export default function AddTask() {
	return (
		<View style={FillStyleSheet.fillWithMargins}>
			<Stack.Screen options={{ title: 'Add task', animation: 'none' }} />
			<TaskForm />
		</View>
	);
}
