import { StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
	safe: {
		height: "100%",
		paddingHorizontal: 10,
	},
	itemList: {
		flexDirection: "row",
		borderBottomWidth: 1,
	},
	RigthItem: {
		width: "20%",
		marginVertical: 10,
		alignItems: 'center',
	},
	labelDate: {
		color: theme.color_dark5,
		fontFamily: 'Inter-Bold',
		fontSize: 14,
	},
	leftItem: {
		width: "60%",
		marginHorizontal: 8,
		justifyContent: 'center',
	},
	labelTitle: {
		color: theme.color_dark5,
		fontFamily: 'Inter-Bold',
		fontSize: 18,
	},
	labelAnotation: {
		color: theme.color_dark5,
		fontSize: 14,
	},
	addButton: {
		right: 35,
		width: 60,
		bottom: 95,
		height: 60,
		borderRadius: 50,
		position: "absolute",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: theme.color_primary1,
	},
	more: {
		width: 30,
		height: 30,
	},
	emptyList: {
		flex: .9,
		justifyContent: 'center',
		alignItems: 'center'
	},
	textEmptyList: {
		fontSize: 16,
		maxWidth: 200,
		color: theme.color_dark5,
		textAlign: 'center'
	}
});

export default styles;
