import { Stack } from 'expo-router';
import { View } from 'react-native';
import TaskForm from 'components/TaskForm';

export default function AddTask() {
	return (
		<View>
			<Stack.Screen options={{ title: 'Add task' }} />
			<TaskForm />
		</View>
	);
}
