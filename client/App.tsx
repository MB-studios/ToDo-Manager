import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';

export default function App() {
	const colorScheme = useColorScheme();

	const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
	const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;

	return (
		<PaperProvider>
			{/* 
				<View style={[styles.container, themeContainerStyle]}>
					<Text style={[themeTextStyle]}>Open up App.tsx to start working on your app!</Text>
					<StatusBar style="auto" />
				</View>*/}
		</PaperProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	lightContainer: {
		backgroundColor: '#d0d0c0',
	},
	darkContainer: {
		backgroundColor: '#242c40',
	},
	lightThemeText: {
		color: '#242c40',
	},
	darkThemeText: {
		color: '#d0d0c0',
	},
});
