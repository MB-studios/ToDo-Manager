import { AppStateStatus, Platform } from 'react-native';
import { QueryClient, QueryClientProvider, focusManager } from '@tanstack/react-query';
import { useAppState } from '../hooks/useAppState';
import { useOnlineManager } from '../hooks/useOnlineManager';
import { Stack } from 'expo-router/stack';

function onAppStateChange(status: AppStateStatus) {
	if (Platform.OS !== 'web') {
		focusManager.setFocused(status === 'active');
	}
}

const queryClient = new QueryClient({
	defaultOptions: { queries: { retry: 2 } },
});

export default function Layout() {
	useOnlineManager();

	useAppState(onAppStateChange);
	return (
		<QueryClientProvider client={queryClient}>
			<Stack />
		</QueryClientProvider>
	);
}
