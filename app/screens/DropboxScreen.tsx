import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, BackHandler } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

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
    // Este efeito é chamado quando o componente é montado.
    // Aqui, verificamos se o usuário já está autenticado.
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Se o usuário já estiver autenticado, podemos prosseguir com a verificação do token no Firestore.
        checkTokenInFirestore(user.uid);
      }
    });
  }, []);

  useEffect(() => {
    // Este efeito é chamado quando accessToken é atualizado.
    // Aqui, verificamos se há um token e, se houver, armazenamos no Firestore.
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

  const checkTokenInFirestore = async (userId: string) => {
    const firestore = getFirestore();
    const userRef = doc(firestore, 'users', userId);

    // Verifica se o usuário já tem um documento no Firestore
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      // Se existir, verifica se há tokens no documento
      const tokens = userDoc.data().tokens || [];

      if (tokens.length > 0) {
        // Se houver tokens, você pode decidir o que fazer com eles
        console.log('Tokens existem:', tokens);
      } else {
        console.log('Nenhum token encontrado.');
      }
    } else {
      console.log('Usuário não tem documento no Firestore.');
    }
  };

  const storeTokenInFirestore = async (token: string) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const userId = user.uid;
      const firestore = getFirestore();
      const userRef = doc(firestore, 'users', userId);

      // Obter a data atual
      const now = new Date();

      // Armazena o token no Firestore com timestamps
      await setDoc(userRef, {
        tokens: [{ token, createdAt: now, updatedAt: now }],
      }, { merge: true });
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
