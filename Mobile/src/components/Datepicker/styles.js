import { StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
	button: {
		margin: 10,
		flexDirection: 'row',
		alignItems: 'center'
	},
	buttonText: {
		fontSize: 24,
		color: theme.color_black
	},
	buttonImage: {
		width: 24,
		height: 24,
		marginHorizontal: 10
	}
});

export default styles;
