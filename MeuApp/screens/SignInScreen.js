import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import api from '../services/api';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('candidate'); 

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* Título Principal */}
        <Text style={styles.title}>Vaga Certa!</Text>

        {/* Subtítulos */}
        <Text style={styles.subtitle}>Realizar login</Text>
        <Text style={styles.description}>
          Entre com sua conta ou Cadastre-se
        </Text>

        {/* Formulário de Input */}
        <TextInput
          style={styles.input}
          placeholder="email@domain.com"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="senha"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true} 
        />

        

        <TouchableOpacity 
          style={styles.buttonPrimary}
          onPress={async () => {
            try {
              if (!email || !password) return Alert.alert('Preencha email e senha');
              const res = await api.login(email, password);
              await api.saveToken(res.token);
              const role = res.profile?.role;
              if (role === 'company') {
                navigation.reset({ index: 0, routes: [{ name: 'EmpresaApp' }] });
              } else {
                navigation.reset({ index: 0, routes: [{ name: 'MainApp' }] });
              }
            } catch (err) {
              const msg = err?.error || err?.message || 'Erro ao autenticar';
              Alert.alert('Erro', String(msg));
            }
          }}
        >
          <Text style={styles.buttonPrimaryText}>Continue</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>


        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate('CadastroPJ')}
        >
          <Text style={styles.buttonSecondaryText}>Cadastre sua Empresa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSecondary}

          onPress={() => navigation.navigate('CadastroPF')}
        >
          <Text style={styles.buttonSecondaryText}>Cadastre seu Curriculo</Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
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
    marginBottom: 15,
  },
  buttonPrimary: {
    width: '100%',
    height: 50,
    backgroundColor: '#000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonPrimaryText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    marginHorizontal: 15,
    color: '#888',
    fontSize: 14,
  },
  buttonSecondary: {
    width: '100%',
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonSecondaryText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  accountTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  accountTypeButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 6,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center',
  },
  accountTypeButtonActive: {
    backgroundColor: '#000',
  },
  accountTypeText: {
    color: '#000',
    fontWeight: '600',
  },
  accountTypeTextActive: {
    color: '#fff',
  },
});

export default SignInScreen;