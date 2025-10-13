
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import SignInScreen from './screens/SignInScreen';
import CadastroPJScreen from './screens/CadastroPJScreen';
import CadastroPFScreen from './screens/CadastroPFScreen';
import HomeScreen from './screens/HomeScreen';
import PerfilScreen from './screens/PerfilScreen';
import BuscarScreen from './screens/BuscarScreen'; 
import EmpresaHomeScreen from './screens/EmpresaHomeScreen';
import AddVagaScreen from './screens/AddVagaScreen';
import EmpresaVagasScreen from './screens/EmpresaVagasScreen';
import PerfilEmpresaScreen from './screens/PerfilEmpresaScreen';
import DetalhesVagaScreen from './screens/DetalhesVagaScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Buscar') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Buscar" component={BuscarScreen} />
      <Tab.Screen name="Perfil"component={PerfilScreen}initialParams={{ userId: '1' }}/>
      </Tab.Navigator>
      
  );
}


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="CadastroPJ" component={CadastroPJScreen} />
        <Stack.Screen name="CadastroPF" component={CadastroPFScreen} />
        <Stack.Screen name="MainApp" component={MainTabNavigator} />
        <Stack.Screen name="EmpresaApp" component={EmpresaHomeScreen} />
        <Stack.Screen name="AddVaga" component={AddVagaScreen} />
        <Stack.Screen name="EmpresaVagas" component={EmpresaVagasScreen} />
        <Stack.Screen name="PerfilEmpresa" component={PerfilEmpresaScreen} />
        <Stack.Screen
          name="DetalhesVaga"
          component={DetalhesVagaScreen}
          options={({ route, navigation }) => ({
            headerShown: true,
            headerTitle: route?.params?.vaga?.cargo || 'Detalhes da Vaga',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 12 }}>
                <Ionicons name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;