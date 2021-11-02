import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from './components/Main.js'
import Positions from './components/Positions.js';
import Maps from "./components/Maps";


const Stack = createNativeStackNavigator();
function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={Main} options={{headerShown: false }}  />
          <Stack.Screen name="Positions" component={Positions} options={positionsHeaderStyles}  />
          <Stack.Screen name="Maps" component={Maps} options={mapsHeaderStyles}  />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
const positionsHeaderStyles = {
    title: 'Positions',
    headerStyle: {
        backgroundColor: '#673AB7',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
        fontWeight: 'bold',
    }
}

const mapsHeaderStyles = {
    title: 'maps',
    headerStyle: {
        backgroundColor: '#673AB7',
    },
    headerTintColor: '#ffffff',

}


export default App;
