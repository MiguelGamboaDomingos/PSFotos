// Importar as dependências necessárias
import React, { useState } from 'react';
import { FAB, Portal, Dialog, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

interface FloatingActionButtonProps {
  onOptionPress: (option: string) => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onOptionPress }) => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isSyncMenuVisible, setSyncMenuVisible] = useState(false);
  const navigation = useNavigation();

  const abrirMenu = () => setMenuVisible(true);
  const fecharMenu = () => setMenuVisible(false);
  const abrirMenuDeSincronizacao = () => {
    setMenuVisible(false);
    setSyncMenuVisible(true);
  };
  const fecharMenuDeSincronizacao = () => setSyncMenuVisible(false);

  const lidarComSelecaoDoProvedor = (provedor: string) => {
    fecharMenuDeSincronizacao();

    // Navegar para a tela correspondente ao provedor escolhido
    switch (provedor) {
      case 'Dropbox':
        navigation.navigate('DropboxScreen');
        break;
      case 'Google Drive':
        navigation.navigate('GoogleDriveScreen');
        break;
      case 'ICloud':
        navigation.navigate('ICloudScreen');
        break;
      default:
        onOptionPress(provedor);
        break;
    }
  };

  return (
    <>
      <FAB
        style={{
          position: 'absolute',
          margin: 16,
          alignSelf: 'center',
          bottom: 0,
          backgroundColor: 'white',
          zIndex: 1,
          elevation: 6,
          width: 56,
          height: 56,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        icon="plus"
        onPress={abrirMenu}
      />

      <Portal>
        <Dialog visible={isMenuVisible} onDismiss={fecharMenu}>
          <Dialog.Title style={{ textAlign: 'center' }}>Menu</Dialog.Title>
          <Dialog.Content>
            <Button onPress={() => onOptionPress('Criar Álbum')}>Criar Álbum</Button>
            <Button onPress={abrirMenuDeSincronizacao}>Sincronizar Nova Conta</Button>
            <Button onPress={() => onOptionPress('Adicionar Utilizadores')}>Adicionar Utilizadores</Button>
          </Dialog.Content>
        </Dialog>

        <Dialog visible={isSyncMenuVisible} onDismiss={fecharMenuDeSincronizacao}>
          <Dialog.Title style={{ textAlign: 'center' }}>Escolha o Provedor</Dialog.Title>
          <Dialog.Content>
            <Button onPress={() => lidarComSelecaoDoProvedor('Google Drive')}>Google Drive</Button>
            <Button onPress={() => lidarComSelecaoDoProvedor('Dropbox')}>Dropbox</Button>
            <Button onPress={() => lidarComSelecaoDoProvedor('OneDrive')}>OneDrive</Button>
            <Button onPress={() => lidarComSelecaoDoProvedor('ICloud')}>ICloud</Button>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </>
  );
};

export default FloatingActionButton;
