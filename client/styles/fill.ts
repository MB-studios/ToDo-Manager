import { StyleSheet } from 'react-native';

const FillStyleSheet = StyleSheet.create({
	fill: {
		flex: 1,
	},
	fillHorizontalWithMargins: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 10,
	},
	fillWithMargins: {
		flex: 1,
		margin: 10,
	},
});

export default FillStyleSheet;
