// AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Login';
import InsideLayout from '../InsideLayout';
import Detalhes from '../Detalhes';

const Stack = createStackNavigator();

export const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login" component={Login} options={{ headerShown: true }} />
    <Stack.Screen name="InsideLayout" component={InsideLayout} options={{ headerShown: false }} />
    <Stack.Screen name="Detalhes" component={Detalhes} options={{ headerShown: true }} />
  </Stack.Navigator>
);
