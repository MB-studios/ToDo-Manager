import * as React from 'react';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { Card, Checkbox } from 'react-native-paper';

const CompletedCheckBox = () => {
	const [checked, setChecked] = React.useState(false);

	return (
		<View style={styles.checkBoxView}>
			<Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => setChecked(!checked)} />
		</View>
	);
};

export const TaskCard = ({
	objectId,
	title,
	description,
}: {
	objectId: string;
	title: string;
	description?: string;
}) => (
	<Pressable
		onPress={() => {
			router.push(`/task/${objectId}`);
		}}
	>
		<Card style={styles.card}>
			<Card.Title title={title} subtitle={description} right={() => <CompletedCheckBox />} />
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
		justifyContent: 'center',
		alignItems: 'center',
	},
});
