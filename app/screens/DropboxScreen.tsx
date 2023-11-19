import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, BackHandler } from 'react-native';import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

const DropboxScreen = () => {
  const dropboxAppKey = 'zvx7p7uchb2pwoy';
  const redirectUri = 'exp://localhost:19000'; // Atualize com a porta do seu servidor Expo
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const navigation = useNavigation();

  const htmlContent = `
    <html>
      <body>
        <script>
          function handleAuthResponse() {
            const accessToken = window.location.hash.split('=')[1];
            window.ReactNativeWebView.postMessage(accessToken);
          }

          window.location.href = "https://www.dropbox.com/oauth2/authorize?client_id=${dropboxAppKey}&response_type=token&redirect_uri=${redirectUri}";
        </script>
      </body>
    </html>
  `;

  useEffect(() => {
    // Impede o botão de voltar físico no Android enquanto estiver na tela de autenticação
    const handleBackButton = () => true;
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  useEffect(() => {
    if (accessToken) {
      // Adicione qualquer lógica adicional aqui, se necessário
      console.log('Access Token:', accessToken);

      // Fechar a tela do Dropbox após obter o token
      navigation.goBack();
    }
  }, [accessToken, navigation]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Componente WebView para autenticação com o Dropbox */}
      <WebView
        source={{ html: htmlContent }}
        onMessage={(event) => {
          const token = event.nativeEvent.data;
          setAccessToken(token);
        }}
      />

      {/* Botão de Cancelar na parte inferior da tela */}
      <TouchableOpacity onPress={handleBackPress} style={styles.cancelButton}>
        <Text>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Alinhar o conteúdo na parte inferior
  },
  cancelButton: {
    width: '100%',
    backgroundColor: 'lightgray',
    padding: 15,
    alignItems: 'center',
  },
});

export default DropboxScreen;
