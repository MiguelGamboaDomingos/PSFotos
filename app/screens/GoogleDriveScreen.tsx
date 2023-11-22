import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, BackHandler } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'; // Adicionando a importação do módulo de autenticação
const DropboxScreen = () => {
  const dropboxAppKey = 'zvx7p7uchb2pwoy';
  const redirectUri = 'exp://localhost:19000'; // Atualize com a porta do seu servidor Expo
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const navigation = useNavigation();
  const webViewRef = useRef<WebView | null>(null);

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
    const handleBackButton = () => {
      handleBackPress();
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  useEffect(() => {
    if (accessToken) {
      storeTokenInFirestore(accessToken);
      console.log('Access Token:', accessToken);
      navigation.goBack();
    }
  }, [accessToken, navigation]);

  const handleBackPress = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
    }
    return true; // Alteração aqui, retornar true indica que o evento de pressionar o botão foi tratado
  };

  const onNavigationStateChange = (navState: WebViewNavigation) => {
    // Atualizar o estado do WebView
    if (navState.canGoBack) {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    } else {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    }
  };

  const storeTokenInFirestore = async (token: string) => {
    const user = firebase.auth().currentUser;

    if (user) {
      const userId = user.uid;
      const firestore = firebase.firestore();
      const userRef = firestore.collection('users').doc(userId);

      // Armazenar o token no Firestore
      await userRef.update({ dropboxAccessToken: token });

      // Você também pode optar por armazenar o token em AsyncStorage se desejar
      await AsyncStorage.setItem('dropboxAccessToken', token);
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={(ref) => (webViewRef.current = ref)}
        source={{ html: htmlContent }}
        onMessage={(event) => {
          const token = event.nativeEvent.data;
          setAccessToken(token);
        }}
        onNavigationStateChange={onNavigationStateChange}
      />

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cancelButton: {
    width: '100%',
    backgroundColor: 'lightgray',
    padding: 15,
    alignItems: 'center',
  },
});

export default DropboxScreen;
