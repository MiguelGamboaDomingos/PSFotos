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

import React, { useState } from 'react';
import { FAB, Portal, Dialog, Button } from 'react-native-paper';

interface FloatingActionButtonProps {
  onOptionPress: (option: string) => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onOptionPress }) => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isSyncMenuVisible, setSyncMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  const openSyncMenu = () => {
    setMenuVisible(false);
    setSyncMenuVisible(true);
  };
  const closeSyncMenu = () => setSyncMenuVisible(false);

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
        onPress={openMenu}
  
      />

      <Portal>
        <Dialog visible={isMenuVisible} onDismiss={closeMenu}>
          <Dialog.Title style={{ textAlign: 'center' }}>Menu</Dialog.Title>
          <Dialog.Content>
            <Button onPress={() => onOptionPress('Criar Álbum')}>Criar Álbum</Button>
            <Button onPress={openSyncMenu}>Sincronizar Nova Conta</Button>
            <Button onPress={() => onOptionPress('Adicionar Utilizadores')}>Adicionar Utilizadores</Button>
          </Dialog.Content>
        </Dialog>

        <Dialog visible={isSyncMenuVisible} onDismiss={closeSyncMenu}>
          <Dialog.Title style={{ textAlign: 'center' }}>Escolha o Provedor</Dialog.Title>
          <Dialog.Content>
            <Button onPress={() => onOptionPress('Google Drive')}>Google Drive</Button>
            <Button onPress={() => onOptionPress('Dropbox')}>Dropbox</Button>
            <Button onPress={() => onOptionPress('iCloud')}>iCloud</Button>
            {/* Adicione outras opções conforme necessário */}
          </Dialog.Content>
        </Dialog>
      </Portal>
    </>
  );
};

export default FloatingActionButton;
