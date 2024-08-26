import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import styles from './style';
import theme from '../../theme';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import { getStorageData, setStorageData } from '../../services/storage';

const CheckBox = ({ option, stateCheck, toggle }) => {
  return <>
    <View>
      <View style={styles.optionContainer}>
        <TouchableOpacity style={styles.touchableOption} onPress={() => { toggle(!stateCheck) }}>
          {stateCheck &&
            <Image
              source={require('../../assets/check.png')}
              style={styles.checkImage}
            />
          }
        </TouchableOpacity>
        <Text style={styles.opText}>{option}</Text>
      </View>
    </View>
  </>
}

const Configuration = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isProfessional, setIsProfessional] = useState(false);
  const [professionalTag, setProfessionalTag] = useState(null);

  const [isCreating, setIsCreating] = useState(true);

  useEffect(() => {
    async function verifyAuth() {
      const auth = await getStorageData('TOKEN');
      setIsCreating(!auth);
      if (!!auth) getLoggedUser();
    }
    verifyAuth();
  }, []);

  const getLoggedUser = async () => {
    await api.get("users").then(response => {
      const data = response.data;
      setFullName(data.completeName);
      setEmail(data.email);
      setPassword("*******");
      isProfessional ? setProfessionalTag(data.tag) : setProfessionalTag(data.professionalTag);
      setIsProfessional(data.isProfessional);
    }).catch(error => {
      console.error("Configuration Error", error.response);
    });
  }

  const registerUser = async () => {
    const body = {
      completeName: fullName,
      email: email,
      password: password,
      isProfessional: isProfessional
    }
    if (!isProfessional) body.professionalTag = professionalTag;
    await api.post("users", body).then(response => {
      navigation.navigate("Login");
    }).catch(error => {
      console.error("Cadastre Error", error.response);
    });

    return;
  }

  const updateUser = async () => {
    const body = {
      completeName: fullName,
      email: email,
    }
    if (password !== "*******") body.password = password;
    if (!isProfessional) body.professionalTag = professionalTag;
    await api.put("users", body).then(response => {
      isProfessional ?
        navigation.navigate("ListingPatients") :
        navigation.navigate("ListingAnnotation");
    }).catch(error => {
      console.error("Cadastre Error", error.response);
    });

    return;
  }

  return <>
    <View style={styles.safe}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
      />
      <TextInput
        id="fullName"
        placeholderTextColor={theme.color_black}
        style={styles.input}
        placeholder="Nome completo"
        onChangeText={text => setFullName(text)}
        value={fullName}
      />
      <TextInput
        id="email"
        placeholderTextColor={theme.color_black}
        style={styles.input}
        placeholder="E-mail"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        id="senha"
        placeholderTextColor={theme.color_black}
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
      />
      {isCreating ?
        <View style={styles.professional}>
          <View style={styles.check}>
            <CheckBox option={'Sou um Profissional'} stateCheck={isProfessional} toggle={setIsProfessional} />
          </View>
          {!isProfessional &&
            <TextInput
              id="professionalTag"
              placeholderTextColor={theme.color_black}
              style={styles.inputTag}
              placeholder="Tag do Profissional (opcional)"
              onChangeText={text => setProfessionalTag(text)}
              value={professionalTag}
            />
          }
        </View>
        :
        <View style={styles.professional}>
          {isProfessional ?
            <TouchableOpacity>
              <TextInput
                id="professionalTag"
                placeholderTextColor={theme.color_dark15}
                style={styles.inputTagProfessional}
                placeholder="Tag do Profissional"
                value={professionalTag}
                editable={false}
              />
            </TouchableOpacity>
            :
            <TextInput
              id="professionalTag"
              placeholderTextColor={theme.color_black}
              style={styles.inputTag}
              placeholder="Tag do Profissional"
              onChangeText={text => setProfessionalTag(text)}
              value={professionalTag}
            />
          }
        </View>
      }
      <TouchableOpacity style={styles.buttonSave} onPress={isCreating ? registerUser : updateUser}>
        <Text style={styles.buttonTextSave}>{isCreating ? 'Registrar' : 'Salvar'}</Text>
      </TouchableOpacity>
    </View>
  </>
};

export default Configuration;
