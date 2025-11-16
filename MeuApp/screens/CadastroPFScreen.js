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

const CadastroPFScreen = ({ navigation }) => {
''
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [idade, setIdade] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [endereco, setEndereco] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        
        {/* Cabeçalho com botão de voltar */}
        <View style={styles.headerContainer}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cadastre-se</Text>
          <View style={{ width: 40 }} /> 
        </View>
        
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Email */}
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="email@domain.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          {/* Senha */}
          <Text style={styles.label}>Senha:</Text>
          <TextInput
            style={styles.input}
            placeholder="senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {/* Nome */}
          <Text style={styles.label}>Nome:</Text>
          <TextInput
            style={styles.input}
            placeholder="nome completo"
            value={nome}
            onChangeText={setNome}
          />

          {/* CPF */}
          <Text style={styles.label}>CPF:</Text>
          <TextInput
            style={styles.input}
            placeholder="000.000.000-00"
            value={cpf}
            onChangeText={setCpf}
            keyboardType="numeric"
          />
          
          {/* Idade */}
          <Text style={styles.label}>Idade:</Text>
          <TextInput
            style={styles.input}
            placeholder="18"
            value={idade}
            onChangeText={setIdade}
            keyboardType="numeric"
          />

          {/* Linha para Estado e Cidade */}
          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Estado:</Text>
              <TextInput
                style={styles.input}
                placeholder="sigla"
                value={estado}
                onChangeText={setEstado}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Cidade:</Text>
              <TextInput
                style={styles.input}
                placeholder="cidade"
                value={cidade}
                onChangeText={setCidade}
              />
            </View>
          </View>

          {/* Endereço */}
          <Text style={styles.label}>Endereço:</Text>
          <TextInput
            style={styles.input}
            placeholder="endereço"
            value={endereco}
            onChangeText={setEndereco}
          />
        </ScrollView>
        
        {/* Container do Botão */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonPrimary}
            onPress={async () => {
              try {
                if (!email || !password || !nome) return Alert.alert('Preencha os campos obrigatórios');
                const payload = { email, password, nome, cpf, idade, estado, cidade, endereco };
                const res = await api.registerUser(payload);
                await api.saveToken(res.token);
                navigation.reset({ index: 0, routes: [{ name: 'MainApp' }] });
              } catch (err) {
                const msg = err?.error || err?.message || 'Erro ao cadastrar';
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
    fontSize: 28,
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

export default CadastroPFScreen;