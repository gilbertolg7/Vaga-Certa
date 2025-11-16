import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../services/api';

const AddVagaScreen = ({ navigation }) => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [escala, setEscala] = useState('');
  const [modelo, setModelo] = useState('');
  const [requisitos, setRequisitos] = useState('');
  const [regime, setRegime] = useState('');

  const handleSalvar = () => {
    if (!titulo.trim()) {
      Alert.alert('Validação', 'Preencha o título da vaga');
      return;
    }

    const payload = {
      titulo: titulo,
      descricao: descricao,
      escala: escala,
      modelo: modelo,
      requisitos: requisitos,
      regime: regime,
    };

    (async () => {
      try {
        const res = await api.createJob(payload);
        Alert.alert('Sucesso', 'Vaga criada');
        navigation.navigate('EmpresaVagas', { novaVaga: res.job });
      } catch (err) {
        const msg = err?.error || err?.message || 'Erro ao criar vaga';
        Alert.alert('Erro', String(msg));
      }
    })();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.title}>Criar Vaga</Text>

        <Text style={styles.label}>Título da vaga</Text>
        <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} />

        <Text style={styles.label}>Descrição</Text>
        <TextInput style={[styles.input, styles.textArea]} value={descricao} onChangeText={setDescricao} multiline />

        <Text style={styles.label}>Escala</Text>
        <TextInput style={styles.input} value={escala} onChangeText={setEscala} />

        <Text style={styles.label}>Modelo</Text>
        <TextInput style={styles.input} value={modelo} onChangeText={setModelo} />

        <Text style={styles.label}>Requisitos</Text>
        <TextInput style={styles.input} value={requisitos} onChangeText={setRequisitos} />

        <Text style={styles.label}>Regime</Text>
        <TextInput style={styles.input} value={regime} onChangeText={setRegime} />

        <TouchableOpacity style={styles.button} onPress={handleSalvar}>
          <Text style={styles.buttonText}>Criar Vaga</Text>
        </TouchableOpacity>
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
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12, textAlign: 'center' },
  label: { marginTop: 12, marginBottom: 6, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#c5c5c5ff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  button: {
    marginTop: 20,
    backgroundColor: '#000',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '700' },
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

export default AddVagaScreen;
