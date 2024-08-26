import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
import styles from "./styles";
import { dateToString } from "../../services/dateType";
import { PieChart } from 'react-native-chart-kit';
import theme from "../../theme";

const ReportScreen = ({ route }) => {
  const { date, title, sentiment, positive, negative, neutral, completeName } = route?.params;
  const emoji = sentiment === "positive" ? require("../../assets/positiveFeel.png") :
    sentiment === "negative" ? require("../../assets/negativeFeel.png") : require("../../assets/neutralFeel.png");
  const desc = sentiment === "positive" ? "foi bom." : sentiment === "negative" ? "não foi tão bom." : "foi normal.";

  const data = [
    {
      name: "Positiva(s)",
      words: positive,
      color: theme.color_chart_positive,
      legendFontColor: theme.color_dark10,
      legendFontSize: 15
    },
    {
      name: "Neutra(s)",
      words: neutral,
      color: theme.color_chart_neutral,
      legendFontColor: theme.color_dark10,
      legendFontSize: 15
    },
    {
      name: "Negativa(s)",
      words: negative,
      color: theme.color_chart_negative,
      legendFontColor: theme.color_dark10,
      legendFontSize: 15
    }
  ];
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false
  };

  return <>
    <View style={styles.safe}>
      <Text style={styles.textDate}>{dateToString(date)}</Text>
      <Text style={styles.textTitle}>{title}</Text>
      <Image style={styles.emoji} source={emoji} />
      <Text style={styles.textDesc}>{`Parece que o dia de ${completeName} ${desc}`}</Text>
      <Text style={styles.textTitle}>Relatório gráfico</Text>
      <View style={styles.viewChart}>
        <PieChart
          data={data}
          width={350}
          height={220}
          chartConfig={chartConfig}
          accessor={"words"}
          backgroundColor={"transparent"}
          paddingLeft={"20"}
          absolute
        />
      </View>
      <View style={styles.viewExplainTexts}>
        <Text style={styles.textExplain}>Este gráfico mostra a quantia de palavras
          <Text style={[styles.textExplain, { color: theme.color_chart_positive, fontWeight: "bold" }]}> positivas</Text>,
          <Text style={[styles.textExplain, { color: theme.color_chart_neutral, fontWeight: "bold" }]}> neutras </Text>
          (na maioria das vezes estas terão maior número) e
          <Text style={[styles.textExplain, { color: theme.color_chart_negative, fontWeight: "bold" }]}> negativas </Text>
          escritas por
          <Text style={styles.textExplain}>{` ${completeName} em ${dateToString(date)}.`}</Text>
        </Text>
      </View>
    </View>
  </>
}

export default ReportScreen;