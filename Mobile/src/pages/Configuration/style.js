import { StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
	safe: {
		height: '100%',
		width: '100%',
		alignItems: 'center',
		color: theme.color_white,
		backgroundColor: theme.color_white,
	},
	logo: {
		width: 81.5,
		height: 100,
		marginTop: 30,
		marginBottom: 50,
	},
	input: {
		fontFamily: 'Inter-Regular',
		color: theme.color_black,
		width: '80%',
		marginBottom: 15,
		paddingLeft: 15,
		fontSize: 18,
		height: 50,
		borderWidth: 1,
		borderColor: theme.color_black,
		borderRadius: 24,
	},
	professional: {
		width: '80%',
	},
	check: {
		width: '100%',
		marginBottom: 15,
		paddingLeft: 15,
	},
	inputTag: {
		fontFamily: 'Inter-Regular',
		color: theme.color_black,
		width: '100%',
		marginBottom: 15,
		paddingLeft: 15,
		fontSize: 18,
		height: 50,
		borderWidth: 1,
		borderColor: theme.color_black,
		borderRadius: 24,
	},
	inputTagProfessional: {
		color: theme.color_dark15,
		borderColor: theme.color_dark15,
		fontFamily: 'Inter-Regular',
		width: '100%',
		marginBottom: 15,
		paddingLeft: 15,
		fontSize: 18,
		height: 50,
		borderWidth: 1,
		borderRadius: 24,
	},
	checkImage: {
		width: 20,
		height: 20,
	},
	optionContainer: {
		flexDirection: 'row',
	},
	touchableOption: {
		height: 22,
		width: 22,
		borderRadius: 4,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: theme.color_black,
		borderWidth: 3,
	},
	opText: {
		marginLeft: 12,
		color: '#555',
		fontSize: 16,
		fontWeight: '600',
	},
	buttonSave: {
		marginTop: 8,
		width: '80%',
		borderRadius: 24,
		backgroundColor: theme.color_primary1,
		height: 48,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonTextSave: {
		color: theme.color_white,
		fontSize: 18,
		fontFamily: 'Inter-Bold',
	},
});

export default styles;
