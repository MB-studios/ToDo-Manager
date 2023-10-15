import { AppStateStatus, Platform, useColorScheme } from 'react-native';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { QueryClient, QueryClientProvider, focusManager } from '@tanstack/react-query';
import { useAppState } from 'hooks/useAppState';
import { useOnlineManager } from 'hooks/useOnlineManager';
import { Stack } from 'expo-router/stack';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function onAppStateChange(status: AppStateStatus) {
	if (Platform.OS !== 'web') {
		focusManager.setFocused(status === 'active');
	}
}

const queryClient = new QueryClient({
	defaultOptions: { queries: { retry: 2 } },
});

export default function Layout() {
	let colorScheme = useColorScheme();
	useOnlineManager();

	useAppState(onAppStateChange);
	return (
		<QueryClientProvider client={queryClient}>
			<PaperProvider theme={colorScheme === 'light' ? MD3LightTheme : MD3DarkTheme}>
				<ThemeProvider value={colorScheme === 'light' ? DefaultTheme : DarkTheme}>
					<Stack />
					{
						//
						<ReactQueryDevtools />
						//
					}
				</ThemeProvider>
			</PaperProvider>
		</QueryClientProvider>
	);
}
