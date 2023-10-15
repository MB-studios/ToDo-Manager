import * as React from 'react';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { Card, Checkbox } from 'react-native-paper';
import { Task } from 'api/types';

const CompletedCheckBox = () => {
	const [checked, setChecked] = React.useState(false);

	return (
		<View style={styles.checkBoxView}>
			<Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => setChecked(!checked)} />
		</View>
	);
};

const redirectToTask = (task: Task) => {
	router.push(`task/${task._id}`);
};

export const TaskCard = ({ task }: { task: Task }) => (
	<Pressable onPress={() => redirectToTask(task)}>
		<Card style={styles.card}>
			<Card.Title title={task.title} subtitle={task.description} right={() => <CompletedCheckBox />} />
		</Card>
	</Pressable>
);

const styles = StyleSheet.create({
	card: {
		margin: 8,
	},
	checkBoxView: {
		aspectRatio: 1,
		flex: 1,
		margin: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
