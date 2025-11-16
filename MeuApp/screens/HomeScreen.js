
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, StatusBar, ActivityIndicator, Alert } from 'react-native';
import VagaCard from '../components/VagaCard';
import api from '../services/api';

const HomeScreen = () => {
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.getJobs();
      setVagas(res.jobs || []);
    } catch (err) {
      const msg = err?.error || err?.message || 'Erro ao buscar vagas';
      Alert.alert('Erro', String(msg));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Vagas Disponíveis</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <FlatList
            data={vagas}
            renderItem={({ item }) => <VagaCard vaga={item} titleBold={true} />}
            keyExtractor={item => String(item.id)}
            showsVerticalScrollIndicator={false}
          />
        )}
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
});

export default HomeScreen;