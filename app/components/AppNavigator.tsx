/**
 * Desenvolvedores:
 *  - Miguel Gamboa (Número de Matrícula: 20170757, Email: domingosm412@gmail.com)
 *  - Diangana Patriarca Ferraz Fortuna (Número de Matrícula: 20190442, Email: dianganaf12@gmail.com)
 *  - Marcelo Bastos (Número de Matrícula: 20181641, Email: marcelo.atkins@gmail.com)
 * 
 * Professor: João Costa
 * Cadeira: Aplicações Móveis
 * Ano Letivo: 2023/24
 * Curso: Engenharia Informática
 * Turma: EIN7-T1
 * 
 * Descrição:
 * Esta aplicação móvel tem como objetivo permitir aos utilizadores criar álbuns de fotos
 * sincronizando suas contas em provedores de armazenamento em nuvem, como Dropbox e Google Drive.
 * Além disso, oferece recursos para adicionar utilizadores, criar álbuns e outras funcionalidades.
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import InsideLayout from './InsideLayout';
import Detalhes from '../screens/Detalhes';
import DropboxScreen from '../screens/DropboxScreen';
import ICloudScreen from '../screens/ICloudScreen';
import GoogleDriveScreen from '../screens/GoogleDriveScreen';


const Stack = createStackNavigator();

export const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login" component={Login} options={{ headerShown: true }} />
    <Stack.Screen name="InsideLayout" component={InsideLayout} options={{ headerShown: false }} />
    <Stack.Screen name="DropboxScreen" component={DropboxScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Detalhes" component={Detalhes} options={{ headerShown: true }} />
    {/* Adicione as novas telas aqui */}
    <Stack.Screen name="GoogleDriveScreen" component={GoogleDriveScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ICloudScreen" component={ICloudScreen} options={{ headerShown: false }} />
   
  </Stack.Navigator>
);


