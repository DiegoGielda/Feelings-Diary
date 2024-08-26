import React, { useEffect, useState } from "react";
import { FlatList, Text, View, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";
import { getStorageData } from "../../services/storage";
import consts from "../../consts";

const ListingReports = ({ route }) => {
  const navigation = useNavigation();
  const [reports, setReports] = useState([]);
  const { patientId, completeName } = route?.params;

  useEffect(() => {
    getReports();
  }, [route])

  const getReports = async () => {
    const auth = await getStorageData('TOKEN');
    await api.get(`patient/${patientId}/notes`, {
      headers: { "authorization": auth },
    }).then(response => {
      setReports(response.data);
    }).catch(error => {
      console.error("ListingReports Error", error.response);
    });
  }

  const Item = ({ id, date, title, sentiment, positive, negative, neutral }) => {
    const day = date.substring(8, 10);
    const month = consts[date?.substring(5, 7)];
    const year = date.substring(0, 4);
    const emoji = sentiment === "positive" ? require("../../assets/positiveFeel.png") :
      sentiment === "negative" ? require("../../assets/negativeFeel.png") : require("../../assets/neutralFeel.png");
    return <>
      <TouchableOpacity
        onPress={() => navigation.navigate("ReportScreen", {
          date, title, sentiment, positive, negative, neutral, completeName
        })}
      >
        <View style={styles.itemList}>
          <View style={styles.RigthItem}>
            <Text style={styles.labelDate}>{day}</Text>
            <Text style={styles.labelDate}>{month}</Text>
            <Text style={styles.labelDate}>{year}</Text>
          </View>
          <View style={styles.leftItem}>
            <Text style={styles.labelTitle}>{title}</Text>
          </View>
          <View style={styles.emojiItem}>
            <Image source={emoji} style={{ width: 25, height: 25 }} />
          </View>
        </View>
      </TouchableOpacity>
    </>
  }

  return <>
    <View style={styles.safe}>
      {reports?.length ?
        <FlatList
          showsVerticalScrollIndicator={false}
          data={reports}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>
            <Item
              id={item.id}
              date={item.date}
              title={item.title}
              sentiment={item.sentiment}
              positive={item.positive}
              negative={item.negative}
              neutral={item.neutral}
            />
          }
        />
        :
        <View style={styles.emptyList}>
          <Text style={styles.textEmptyList}>{`${completeName} ainda não possui nenhum registro.`}</Text>
        </View>
      }
      {/* <TouchableOpacity style={styles.addButton} onPress={() => {  }}>
        <Image source={add} style={styles.more} />
      </TouchableOpacity> */}
    </View>
  </>
}

export default ListingReports;