import { StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  safe: {
    height: "100%",
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignItems: "center",
  },
  textDate: {
    fontSize: 24,
    color: theme.color_black,
    fontWeight: "bold",
    marginBottom: 10
  },
  textTitle: {
    fontSize: 20,
    color: theme.color_black,
    fontWeight: "bold",
    marginBottom: 10
  },
  emoji: {
    width: 100,
    height: 100
  },
  textDesc: {
    fontSize: 17,
    color: theme.color_black,
    marginTop: 10,
    marginBottom: 50,
    maxWidth: 250,
    textAlign: "center"
  },
  viewChart: {
    height: 200,
    width: "100%",
    marginBottom: 25,
    flexDirection: "row",
    alignItems: "flex-start"
  },
  textExplain: {
    fontSize: 14,
    textAlign: "center",
  }
});

export default styles;
