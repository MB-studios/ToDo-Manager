import * as React from 'react';
import { Button, ScrollView, View } from 'react-native';
import { router, Stack } from 'expo-router';
import { IconButton } from 'react-native-paper';
import { TaskCard } from '../components/TaskCard';
import { AddButton } from '../components/AddButton';
//import client from '../lib/api';
import createClient from 'openapi-fetch';
import { paths } from '../lib/api/v1';

const test = async () => {
	const { GET, PUT } = createClient<paths>({ baseUrl: 'http://192.168.1.10:3000' });

	const { data, error } = await GET('/tasks');
	if (error) {
		console.log(error);
		return;
	} else {
		console.log(data);
	}
};

export default function Tasks() {
	return (
		<View>
			<Stack.Screen
				options={{
					title: 'Tasks',
					headerRight: () => <IconButton icon="magnify" onPress={() => console.log('search for tasks')} />,
				}}
			/>
			<ScrollView>
				<TaskCard objectId="asd1" title={'Update README.md'} description={'Including deployment guide'} />
				<TaskCard objectId="asd2" title={'Task with no description'} />
				<TaskCard objectId="asd3" title={'Add categories to tasks'} description={'With corresponding icons'} />
				<TaskCard objectId="asd4" title={'Update README.md'} description={'Including deployment guide'} />
				<TaskCard objectId="asd5" title={'Task with no description'} />
				<TaskCard objectId="asd6" title={'Add categories to tasks'} description={'With corresponding icons'} />
				<TaskCard objectId="asd7" title={'Update README.md'} description={'Including deployment guide'} />
				<TaskCard objectId="asd8" title={'Task with no description'} />
				<TaskCard objectId="asd9" title={'Add categories to tasks'} description={'With corresponding icons'} />
				<TaskCard objectId="asd10" title={'Update README.md'} description={'Including deployment guide'} />
			</ScrollView>
			<AddButton onPress={() => test()} />
			{/* <AddButton onPress={() => router.push('/task')} />*/}
		</View>
	);
}
