import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../pages/Login';
import CrudAnnotation from '../pages/CrudAnnotation';
import RoutesDrawer from './RoutesDrawer';
import theme from '../theme';
import RoutesDrawerProfessional from './RoutesDrawerProfessional';
import ListingReports from '../pages/ListingReports';
import Configuration from '../pages/Configuration';
import ReportScreen from '../pages/ReportScreen';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return <>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="RoutesDrawer" component={RoutesDrawer} />
        <Stack.Screen name="RoutesDrawerProfessional" component={RoutesDrawerProfessional} />
        <Stack.Screen name="Configuration" component={Configuration}
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
            title: "Registrar",
            headerTintColor: theme.color_white,
            headerStyle: {
              backgroundColor: theme.color_primary1,
            },
          }}
        />
        <Stack.Screen name="CrudAnnotation" component={CrudAnnotation}
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
            title: "Anotação",
            headerTintColor: theme.color_white,
            headerStyle: {
              backgroundColor: theme.color_primary1,
            },
          }}
        />
        <Stack.Screen name="ListingReports" component={ListingReports}
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
            title: "Relatórios",
            headerTintColor: theme.color_white,
            headerStyle: {
              backgroundColor: theme.color_primary1,
            },
          }}
        />
        <Stack.Screen name="ReportScreen" component={ReportScreen}
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
            title: "Relatório do dia",
            headerTintColor: theme.color_white,
            headerStyle: {
              backgroundColor: theme.color_primary1,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </>
}

export default Routes;