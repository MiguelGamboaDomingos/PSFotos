// AdicionarAlbumScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs, doc, setDoc, DocumentData } from 'firebase/firestore';

const AdicionarAlbumScreen: React.FC = () => {
  const [contasSincronizadas, setContasSincronizadas] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const auth = getAuth();

    // Verifica se o usuário já está autenticado
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Se autenticado, busca contas sincronizadas no Firestore
        buscarContasSincronizadas(user.uid);
      } else {
        // Se não autenticado, redireciona para a tela de login
        navigation.navigate('Login');
      }
    });
  }, [navigation]);

  const buscarContasSincronizadas = async (userId: string) => {
    const firestore = getFirestore();
    const contasRef = collection(firestore, 'users', userId, 'contasSincronizadas');

    try {
      const contasSnapshot = await getDocs(contasRef);
      const contas = contasSnapshot.docs.map((doc) => doc.id);
      setContasSincronizadas(contas);
    } catch (error) {
      console.error('Erro ao buscar contas sincronizadas:', error);
    } finally {
      setLoading(false);
    }
  };

  const abrirArmazenamentoDropbox = (conta: string) => {
    // Implemente a lógica para abrir o armazenamento do Dropbox aqui
    // Você pode usar a biblioteca do Dropbox para interagir com a API do Dropbox
    // e permitir ao usuário escolher fotos para adicionar ao álbum
  };

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View>
      <Text>Contas Sincronizadas:</Text>
      {contasSincronizadas.length > 0 ? (
        <FlatList
          data={contasSincronizadas}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => abrirArmazenamentoDropbox(item)}>
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text>Nenhuma conta sincronizada encontrada.</Text>
      )}
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default AdicionarAlbumScreen;
