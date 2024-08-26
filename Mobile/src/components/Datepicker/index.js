import { Image, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import React, { useState } from 'react'
import DatePicker from 'react-native-date-picker'
import { dateToString } from "../../services/dateType";

const DatePickerComponent = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => setOpen(true)} style={styles.button}>
        <Image source={require('../../assets/calendar.png')} style={styles.buttonImage} />
        <Text style={styles.buttonText}>
          {dateToString(props.date) || dateToString(new Date())}
        </Text>
      </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        date={props.date}
        mode="date"
        onConfirm={(date) => {
          setOpen(false);
          props.setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  )
}

export default DatePickerComponent;