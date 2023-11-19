import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';

const GoogleDriveScreen: React.FC = () => {
  const googleDriveClientId = '695981301303-jiv7qj9urlsgbmga5m0lu2h6qk4clu18.apps.googleusercontent.com';

  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const checkAccessToken = async () => {
      const storedToken = await AsyncStorage.getItem('googleDriveAccessToken');
      if (storedToken) {
        setAccessToken(storedToken);
      }
    };

    checkAccessToken();
  }, []);

  const handleLogin = async () => {
    const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });

    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${googleDriveClientId}&redirect_uri=${redirectUri}&response_type=token&scope=https://www.googleapis.com/auth/drive.file`;

    try {
      const response = await AuthSession.startAsync({ authUrl });

      if (response.type === 'success' && response.params.access_token) {
        await AsyncStorage.setItem('googleDriveAccessToken', response.params.access_token);
        setAccessToken(response.params.access_token);
      }
    } catch (error) {
      console.error('Erro ao iniciar a sessão:', error);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('googleDriveAccessToken');
    setAccessToken(null);
  };

  const handleOpenLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      {accessToken ? (
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text>Logout</Text>
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text>Login with Google Drive</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleOpenLink('')} style={styles.cancelButton}>
            <Text>Cancelar</Text>
          </TouchableOpacity>
        </>
      )}

      {accessToken && (
        <WebView
          source={{ uri: 'https://www.google.com/drive/' }}
          style={styles.webView}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginButton: {
    padding: 10,
    backgroundColor: 'lightblue',
  },
  logoutButton: {
    padding: 10,
    backgroundColor: 'lightcoral',
  },
  cancelButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'lightcoral',
    alignItems: 'center',
  },
  webView: {
    flex: 1,
  },
});

export default GoogleDriveScreen;
