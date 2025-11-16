import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../services/api';
import VagaCard from '../components/VagaCard';

const EmpresaVagasScreen = ({ route, navigation }) => {
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadJobs = async () => {
    setLoading(true);
    try {
      // Get company profile to obtain company id
      const profileRes = await api.getProfile();
      const companyId = profileRes.profile?.id;
      if (!companyId) {
        setVagas([]);
        return;
      }

      const res = await api.getJobs({ companyId });
      const jobs = res.jobs || [];
      setVagas(jobs);
    } catch (err) {
      const msg = err?.error || err?.message || 'Erro ao buscar vagas';
      Alert.alert('Erro', String(msg));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    const nova = route?.params?.novaVaga;
    if (nova) {
      // if nova has id from backend, prepend; otherwise reload
      if (nova.id) setVagas((prev) => (prev.some((v) => v.id === nova.id) ? prev : [nova, ...prev]));
      else loadJobs();
    }
  }, [route?.params?.novaVaga]);

  const handleExcluir = (id) => {
    Alert.alert('Excluir vaga', 'Deseja realmente excluir esta vaga?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await api.deleteJob(id);
            setVagas((prev) => prev.filter((v) => String(v.id) !== String(id)));
            Alert.alert('Sucesso', 'Vaga excluída');
          } catch (err) {
            const msg = err?.error || err?.message || 'Erro ao excluir vaga';
            Alert.alert('Erro', String(msg));
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.title}>Vagas da Empresa</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : vagas.length === 0 ? (
          <Text style={styles.sub}>Nenhuma vaga disponível.</Text>
        ) : (
          vagas.map((vaga) => (
            <VagaCard key={vaga.id} vaga={vaga} onDelete={(id) => handleExcluir(id)} />
          ))
        )}
      </ScrollView>

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
  container: { flex: 1, backgroundColor: '#fff' },
  inner: { padding: 20 },
  title: { fontSize: 26, fontWeight: '800', textAlign: 'center', marginBottom: 8 },
  sub: { marginTop: 10, color: '#666' },
  card: { marginTop: 14, padding: 14, borderWidth: 1, borderColor: '#e6e6e6', borderRadius: 8, backgroundColor: '#fff' },
  cardTitle: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  cardText: { fontSize: 16, color: '#444', marginBottom: 8 },
  cardMeta: { color: '#777', fontSize: 12 },
});

styles.bottomMenu = {
  height: 64,
  borderTopWidth: 1,
  borderColor: '#e6e6e6',
  backgroundColor: '#fff',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
};
styles.menuItem = {
  alignItems: 'center',
};

export default EmpresaVagasScreen;
