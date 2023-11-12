// LoginScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState (false);
  const auth = FIREBASE_AUTH;

  
const handleLogin = async () => {
  console.log('Botão de Login pressionado');
  setLoading(true);
  try {
    const response = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
    console.log('Login bem-sucedido');
    // Adicione a navegação aqui após o login bem-sucedido
    navigation.navigate('InsideLayout');
  } catch (error: any) {
    console.error('Falha ao entrar:', error.code);
    // Trate os erros específicos do Firebase
    if (error.code === 'auth/user-not-found') {
      alert('Usuário não encontrado. Verifique suas credenciais ou registre-se.');
    } else if (error.code === 'auth/wrong-password') {
      alert('Senha incorreta. Por favor, tente novamente.');
    } else {
      alert('Falha ao entrar. Por favor, tente novamente.');
    }
  }
  setLoading(false);
};
  const navigateToRegister  = async () => {
    // lógica de registo
    console.log('Botão de Signup pressionado');
    setLoading(true);
    try{
        const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
        alert('Verifique o email');
    }catch(error: any){
        alert('Falha ao entrar');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
        <Text style={styles.title}>Conecte-se</Text>
        <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            
            value={email}
            onChangeText={setEmail}
        />
        <TextInput
            style={styles.input}
            placeholder="Palavra-passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
        />
        {loading ? (<ActivityIndicator size="large" color="#0000ff"/>
            ) : (
            <>
                <Button title="Entrar" onPress={handleLogin} />
                <Text style={styles.registerText} onPress={navigateToRegister}>
                    Não tem uma conta? Registre-se aqui.
                </Text>
            </>
            )}
        </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
  registerText: {
    marginTop: 16,
    color: 'blue',
  },
});

export default Login;
 