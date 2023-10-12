import React, { useEffect, useState } from 'react';
import { router, Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { Divider, IconButton, Switch, Text, TextInput } from 'react-native-paper';

export default function Task() {
	const params = useLocalSearchParams<{
		title: string;
		description: string;
		completed: string;
	}>();

	const { title, description, completed } = params;

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					title: title,
					headerRight: () => (
						<IconButton icon="lead-pencil" onPress={() => router.push({ pathname: 'task/edit/', params })} />
					),
				}}
			/>
			<View>
				<View style={styles.row}>
					<Text variant="titleLarge">Task completed</Text>
					<Switch value={completed === 'true'} onValueChange={() => console.log('Change completed status')} />
				</View>
				<Divider />
				<View style={styles.row}>
					<Text variant="titleLarge">Due date</Text>
					<Text variant="bodyLarge">No due date</Text>
				</View>
				<Divider />
				<View style={styles.row}>
					<Text variant="bodyLarge">{description}</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		margin: 10,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginVertical: 10,
	},
});
