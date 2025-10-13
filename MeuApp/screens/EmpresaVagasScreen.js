import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { VAGAS_DISPONIVEIS } from './HomeScreen';

const EmpresaVagasScreen = ({ route, navigation }) => {
  const initial = route?.params?.vagas || (route?.params?.novaVaga ? [route.params.novaVaga] : []);
  const autoPartsExamples = VAGAS_DISPONIVEIS.filter((v) => v.empresa === 'AutoParts').slice(0, 2);
  const [vagas, setVagas] = useState(initial && initial.length ? initial : autoPartsExamples);

  useEffect(() => {
    const nova = route?.params?.novaVaga;
    if (nova) {
      setVagas((prev) => {
        if (prev.some((v) => v.id === nova.id)) return prev;
        return [nova, ...prev];
      });
    }
  }, [route?.params?.novaVaga]);

  const handleExcluir = (id) => {
    Alert.alert('Excluir vaga', 'Deseja realmente excluir esta vaga?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => setVagas((prev) => prev.filter((v) => v.id !== id)),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.title}>Vagas da Empresa</Text>

        {vagas.length === 0 ? (
          <Text style={styles.sub}>Nenhuma vaga disponível.</Text>
        ) : (
          vagas.map((vaga) => (
            <View key={vaga.id} style={styles.card}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{vaga.cargo || vaga.titulo || 'Vaga'}</Text>
                  {vaga.descricao ? <Text style={styles.cardText}>{vaga.descricao}</Text> : null}
                  <Text style={styles.cardMeta}>Escala: {vaga.escala || '-'} • Modelo: {vaga.modelo || '-'}</Text>
                  <Text style={styles.cardMeta}>Regime: {vaga.regime || '-'}</Text>
                </View>
                <TouchableOpacity onPress={() => handleExcluir(vaga.id)} style={{ marginLeft: 12 }}>
                  <Ionicons name="trash" size={22} color="#c00" />
                </TouchableOpacity>
              </View>
            </View>
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
