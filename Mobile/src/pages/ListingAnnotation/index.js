import React, { useEffect, useState } from "react";
import { FlatList, Text, View, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import add from "../../assets/add.png";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";
import { getStorageData } from "../../services/storage";
import consts from "../../consts";

const ListingAnnotation = () => {
  const navigation = useNavigation();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    navigation.addListener('focus', async () => {
      await getNotes();
    })
  }, [])

  const getNotes = async () => {
    const auth = await getStorageData('TOKEN');
    await api.get("notes", {
      headers: { "authorization": auth },
    }).then(response => {
      setNotes(response.data);
    }).catch(error => {
      console.error("ListingAnnotation Error", error.response);
    });
  }

  const detailAnotation = (title, description, date, id) => {
    navigation.navigate('CrudAnnotation', {
      pTitle: title,
      pDescription: description,
      pDate: date,
      pId: id
    });
  };

  const Item = ({ title, date, description, id }) => {
    const day = date.substring(8, 10);
    const month = consts[date?.substring(5, 7)];
    const year = date.substring(0, 4);
    const descriptionPresentation = description.substring(0, 80) + ' ...';
    return <>
      <TouchableOpacity onPress={() => { detailAnotation(title, description, date, id) }}>
        <View style={styles.itemList}>
          <View style={styles.RigthItem}>
            <Text style={styles.labelDate}>{day}</Text>
            <Text style={styles.labelDate}>{month}</Text>
            <Text style={styles.labelDate}>{year}</Text>
          </View>
          <View style={styles.leftItem}>
            <Text style={styles.labelTitle}>{title}</Text>
            <Text style={styles.labelAnotation}>{descriptionPresentation}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  }

  return <>
    <View style={styles.safe}>
      {notes?.length ?
        <FlatList
          showsVerticalScrollIndicator={false}
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>
            <Item
              title={item.title}
              date={item.date}
              description={item.description}
              id={item.id}
            />
          }
        />
        :
        <View style={styles.emptyList}>
          <Text style={styles.textEmptyList}>{`Você ainda não possui nenhuma anotação.`}</Text>
        </View>
      }
      <TouchableOpacity style={styles.addButton} onPress={() => { detailAnotation() }}>
        <Image source={add} style={styles.more} />
      </TouchableOpacity>
    </View>
  </>
}

export default ListingAnnotation;