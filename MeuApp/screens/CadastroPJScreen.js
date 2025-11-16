import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import api from '../services/api';

const CadastroPJScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        
        {/* --- CABEÇALHO COM BOTÃO DE VOLTAR --- */}
        <View style={styles.headerContainer}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cadastre sua Empresa</Text>
          {/* View invisível para ajudar a centralizar o título corretamente */}
          <View style={{ width: 40 }} /> 
        </View>
        
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Email */}
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="email@domain.com"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          {/* Senha */}
          <Text style={styles.label}>Senha:</Text>
          <TextInput
            style={styles.input}
            placeholder="senha"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {/* Nome da Empresa */}
          <Text style={styles.label}>Nome da Empresa:</Text>
          <TextInput
            style={styles.input}
            placeholder="nome completo"
            placeholderTextColor="#888"
            value={companyName}
            onChangeText={setCompanyName}
          />

          {/* CNPJ */}
          <Text style={styles.label}>CNPJ:</Text>
          <TextInput
            style={styles.input}
            placeholder="00.000.000/0000-00"
            placeholderTextColor="#888"
            value={cnpj}
            onChangeText={setCnpj}
            keyboardType="numeric"
          />

          {/* Linha para Estado e Cidade */}
          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Estado:</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Paraná"
                placeholderTextColor="#888"
                value={state}
                onChangeText={setState}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Cidade:</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Dois Vizinhos"
                placeholderTextColor="#888"
                value={city}
                onChangeText={setCity}
              />
            </View>
          </View>

          {/* Endereço */}
          <Text style={styles.label}>Endereço:</Text>
          <TextInput
            style={styles.input}
            placeholder="Rua, número, bairro"
            placeholderTextColor="#888"
            value={address}
            onChangeText={setAddress}
          />
        </ScrollView>
        
        {/* Container do Botão (fora do ScrollView) */}
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.buttonPrimary}
        onPress={async () => {
          try {
            if (!email || !password || !companyName) return Alert.alert('Preencha os campos obrigatórios');
            const payload = {
              email,
              password,
              nome: companyName,
              cnpj,
              estado: state,
              cidade: city,
              endereco: address,
            };
            const res = await api.registerCompany(payload);
            await api.saveToken(res.token);
            navigation.reset({ index: 0, routes: [{ name: 'EmpresaApp' }] });
          } catch (err) {
            const msg = err?.error || err?.message || 'Erro ao cadastrar empresa';
            Alert.alert('Erro', String(msg));
          }
        }}
      >
        <Text style={styles.buttonPrimaryText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputGroup: {
    width: '48%', 
  },
  buttonContainer: {
    paddingTop: 10, 
    paddingBottom: 20,
    borderTopWidth: 1, 
    borderTopColor: '#f0f0f0',
  },
  buttonPrimary: {
    width: '100%',
    height: 50,
    backgroundColor: '#000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPrimaryText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CadastroPJScreen;