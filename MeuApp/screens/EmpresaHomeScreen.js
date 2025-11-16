import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, StatusBar, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import VagaCard from '../components/VagaCard';
import api from '../services/api';

const EmpresaHomeScreen = ({ navigation }) => {
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
        <Text style={styles.headerTitle}>Vagas Disponíveis </Text>
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

      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('EmpresaApp')}>
          <Ionicons name="home" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('AddVaga')}>
          <Ionicons name="add-circle" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('EmpresaVagas')}>
          <Ionicons name="book" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PerfilEmpresa')}>
          <Ionicons name="person" size={24} color="#000" />
        </TouchableOpacity>
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
  bottomMenu: {
    height: 64,
    borderTopWidth: 1,
    borderColor: '#e6e6e6',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  menuItem: {
    alignItems: 'center',
  },
});

export default EmpresaHomeScreen;
