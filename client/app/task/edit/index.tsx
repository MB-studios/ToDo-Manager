import { Stack, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import TaskForm from 'components/TaskForm';

export default function EditTask() {
	const params = useLocalSearchParams<{
		_id: string;
		title: string;
		description: string;
		completed: string;
	}>();

	const { _id, title, description, completed } = params;

	return (
		<View>
			<Stack.Screen options={{ title: 'Edit task' }} />
			<TaskForm _id={_id} title={title} description={description} />
		</View>
	);
}
