import * as React from 'react';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { Card, Checkbox } from 'react-native-paper';

type Props = {
	item: any;
	onPress: (item: any) => void;
};

const CompletedCheckBox = () => {
	const [checked, setChecked] = React.useState(false);

	return (
		<View style={styles.checkBoxView}>
			<Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => setChecked(!checked)} />
		</View>
	);
};

export const TaskCard = ({ item, onPress }: Props) => (
	<Pressable
		onPress={() => {
			onPress(item);
		}}
	>
		<Card style={styles.card}>
			<Card.Title title={item.title} subtitle={item.description} right={() => <CompletedCheckBox />} />
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
