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
import { View, StyleSheet } from 'react-native';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { Button, Avatar } from 'react-native-paper';
import FloatingActionButton from './FloatingActionButton';

interface RouterProps {
  navigation: any;
  userName: string;
}

const InsideLayout: React.FC<RouterProps> = ({ navigation, userName }) => {
  const handleOptionPress = (option: string) => {
    console.log(`Opção selecionada: ${option}`);
    // Adicione a lógica para lidar com a seleção da opção
  };

  const handleSignOut = () => {
    FIREBASE_AUTH.signOut();
    navigation.navigate('Login'); // Navegar para a tela de login após o logout
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Avatar.Icon size={48} icon="account-circle" />
          <Button onPress={handleSignOut}>Sair</Button>
        </View>
        <Button
          icon="bell" // Ícone de notificação
          color="white" // Cor do ícone
          onPress={() => console.log('Notificações')} // Adicione a lógica para lidar com notificações
        >
          Notificações
        </Button>
      </View>

      <View style={styles.content}>
        <View style={styles.panelContainer}>
          <Button
            icon="folder"
            style={styles.panelButton}
            onPress={() => handleOptionPress('Álbuns')}
          >
            Álbuns
          </Button>
          <Button
            icon="account-group"
            style={styles.panelButton}
            onPress={() => handleOptionPress('Contas')}
          >
            Contas
          </Button>
        </View>
      </View>

      {/* Componente FloatingActionButton */}
      <FloatingActionButton onOptionPress={handleOptionPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  panelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  panelButton: {
    width: 120,
  },
});

export default InsideLayout;
