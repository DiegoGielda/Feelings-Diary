import React from 'react';
import { Pressable, Alert, View } from "react-native";
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import ListingAnnotation from "../../pages/ListingAnnotation";
import AntDesign from "react-native-vector-icons/AntDesign";
import Configuration from '../../pages/Configuration';
import theme from '../../theme';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { setStorageData } from '../../services/storage';

const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => {
  const navigation = useNavigation();
  const logout = async () => {
    try {
      await setStorageData("TOKEN", "");
      api.defaults.headers.common["authorization"] = null;
    } catch (error) {
      console.log(error);
    }
    navigation.navigate("Login");
  }

  return <>
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Sair"
          inactiveTintColor={theme.color_white}
          activeTintColor={theme.color_white}
          onPress={logout}
          style={{}}
        />
      </DrawerContentScrollView>
    </View>
  </>
}

const RoutesDrawer = () => {

  return <>
    <Drawer.Navigator
      screenOptions={
        {
          headerTintColor: theme.color_white,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: theme.color_primary1
          },
          drawerType: "front",
          drawerInactiveTintColor: theme.color_white,
          drawerActiveTintColor: theme.color_white,
          drawerStyle: {
            backgroundColor: theme.color_primary1,
            width: "70%",
          },
          drawerLabelStyle: { fontSize: 17, fontWeight: "bold" }
        }
      }
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="ListingAnnotation" component={ListingAnnotation}
        options={{
          title: "Anotações",
          drawerIcon: () => {
            <AntDesign name="dashboard" size={20} color={theme.color_white} />
          }
        }}
      />

      <Drawer.Screen name="Configuration" component={Configuration}
        options={{
          title: "Cadastro",
          drawerIcon: () => {
            <AntDesign name="dashboard" size={20} color={theme.color_white} />
          }
        }}
      />

    </Drawer.Navigator >
  </>
}

export default RoutesDrawer;
