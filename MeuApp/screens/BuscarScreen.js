

import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, FlatList, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import VagaCard from '../components/VagaCard'; 
import { VAGAS_DISPONIVEIS } from '../screens/HomeScreen'; 

const BuscarScreen = () => {
  const [termoBuscar, setTermoBuscar] = useState('');
  const [vagasFiltradas, setVagasFiltradas] = useState(VAGAS_DISPONIVEIS);

  const handleSearch = (text) => {
    setTermoBuscar(text);
    const source = Array.isArray(VAGAS_DISPONIVEIS) ? VAGAS_DISPONIVEIS : [];
    if (text && text.trim().length > 0) {
      const filtro = text.toString().toLowerCase();
      const novasVagas = source.filter(vaga => {
        const empresa = (vaga?.empresa || '').toString().toLowerCase();
        const cargo = (vaga?.cargo || '').toString().toLowerCase();
        return empresa.includes(filtro) || cargo.includes(filtro);
      });
      setVagasFiltradas(novasVagas);
    } else {
      setVagasFiltradas(source);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Buscar Vaga</Text>

        {/* Campo de Busca */}
        <View style={styles.buscaContainer}>
          <Ionicons name="search" size={20} color="#888" style={styles.buscaIcon} />
          <TextInput
            style={styles.buscaInput}
            placeholder="Buscar por empresa..."
            placeholderTextColor="#888"
            value={termoBuscar}
            onChangeText={handleSearch}
          />
        </View>

        {/* Lista de Resultados */}
        <FlatList
          data={vagasFiltradas}
          renderItem={({ item }) => <VagaCard vaga={item} />}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhuma vaga encontrada.</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  container: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginVertical: 20,
  },
  buscaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  buscaIcon: {
    marginRight: 10,
  },
  buscaInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#000',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
});

export default BuscarScreen;