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

import React, { useEffect, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './app/screens/components/AppNavigator';  // Certifique-se de ter o caminho correto para o seu AppNavigator
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';
import Login from './app/screens/Login';


export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}