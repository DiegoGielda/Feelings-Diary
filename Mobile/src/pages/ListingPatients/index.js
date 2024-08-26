import React, { useEffect, useState } from "react";
import { FlatList, Text, View, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import profile from "../../assets/profile.png";
import chevron from "../../assets/chevron.png";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";
import { getStorageData } from "../../services/storage";

const ListingPatients = () => {
  const navigation = useNavigation();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    getPatients();
  }, [])

  const getPatients = async () => {
    const auth = await getStorageData('TOKEN');
    await api.get("patients", {
      headers: { "authorization": auth },
    }).then(response => {
      setPatients(response.data);
    }).catch(error => {
      console.error("ListingPatients Error", error.response);
    });
  }

  const Item = ({ patientId, completeName }) => {
    return <>
      <TouchableOpacity onPress={() => navigation.navigate("ListingReports", { patientId: patientId, completeName: completeName })}>
        <View style={styles.itemList}>
          <View style={styles.RigthItem}>
            <Image source={profile} />
          </View>
          <View style={styles.leftItem}>
            <Text style={styles.labelTitle}>{completeName}</Text>
          </View>
          <View style={styles.leftItem}>
            <Image source={chevron} style={{ width: 25, height: 25 }} />
          </View>
        </View>
      </TouchableOpacity>
    </>
  }

  return <>
    <View style={styles.safe}>
      {patients?.length ?
        <FlatList
          showsVerticalScrollIndicator={false}
          data={patients}
          keyExtractor={(item) => item.patientId}
          renderItem={({ item }) =>
            <Item
              patientId={item.patientId}
              completeName={item.completeName}
            />
          }
        />
        :
        <View style={styles.emptyList}>
          <Text style={styles.textEmptyList}>{`Você ainda não possui nenhum paciente vinculado.`}</Text>
        </View>
        //Estilizar melhor este caso
      }
      {/* <TouchableOpacity style={styles.addButton} onPress={() => {  }}>
        <Image source={add} style={styles.more} />
      </TouchableOpacity> */}
    </View>
  </>
}

export default ListingPatients;