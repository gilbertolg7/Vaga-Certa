
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, Modal, TextInput } from 'react-native';
import api from '../services/api';
import { Ionicons } from '@expo/vector-icons';

const PerfilScreen = ({ route, navigation }) => {

  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [areaAtuante, setAreaAtuante] = useState('');
  const [experiencia, setExperiencia] = useState('');
  const [endereco, setEndereco] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const [tempAvatarUrl, setTempAvatarUrl] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await api.getProfile();
        const p = res.profile;
        if (!mounted) return;
        setNome(p.nome || '');
        setIdade(p.idade ? String(p.idade) : '');
        setAreaAtuante(p.areaAtuante || '');
        setExperiencia(p.experiencia || '');
        setEndereco(p.endereco || '');
        setAvatar(p.avatar || '');
      } catch (err) {
        const msg = err?.error || err?.message || 'Erro ao buscar perfil';
        if (err && (err.error === 'Invalid token' || err.error === 'No authorization header')) {
          navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] });
          return;
        }
        Alert.alert('Erro', String(msg));
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>{nome || 'Perfil'}</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={() => { setTempAvatarUrl(avatar || ''); setAvatarModalVisible(true); }}>
          <Image
            source={avatar ? { uri: avatar } : require('../assets/icon.png')}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nome:</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} />

        <Text style={styles.label}>Idade:</Text>
        <TextInput style={styles.input} value={idade} onChangeText={setIdade} keyboardType="numeric" />

        <Text style={styles.label}>Área Atuante:</Text>
        <TextInput style={styles.input} value={areaAtuante} onChangeText={setAreaAtuante} />

        <Text style={styles.label}>Experiência:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={experiencia}
          onChangeText={setExperiencia}
          multiline
        />

        <Text style={styles.label}>Endereço:</Text>
        <TextInput style={styles.input} value={endereco} onChangeText={setEndereco} />
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={async () => {
          try {
            const payload = { nome, idade, endereco, areaAtuante, experiencia };
            const res = await api.updateProfile(payload);
            Alert.alert('Sucesso', 'Perfil atualizado');
          } catch (err) {
            const msg = err?.error || err?.message || 'Erro ao atualizar';
            Alert.alert('Erro', String(msg));
          }
        }}
      >
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>

        <Modal visible={avatarModalVisible} transparent animationType="slide">
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: 20 }}>
            <View style={{ backgroundColor: '#fff', borderRadius: 8, padding: 16 }}>
              <Text style={{ fontWeight: '700', marginBottom: 8 }}>Editar foto de perfil (cole o link)</Text>
              <TextInput placeholder="https://..." value={tempAvatarUrl} onChangeText={setTempAvatarUrl} style={{ borderWidth: 1, borderColor: '#e6e6e6', padding: 8, borderRadius: 6, marginBottom: 12 }} />
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <TouchableOpacity onPress={() => setAvatarModalVisible(false)} style={{ marginRight: 12 }}>
                  <Text style={{ color: '#666' }}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={async () => {
                  try {
                    await api.updateProfile({ avatar: tempAvatarUrl });
                    setAvatar(tempAvatarUrl);
                    setAvatarModalVisible(false);
                    Alert.alert('Sucesso', 'Foto atualizada');
                  } catch (err) {
                    const msg = err?.error || err?.message || 'Erro ao atualizar foto';
                    Alert.alert('Erro', String(msg));
                  }
                }}>
                  <Text style={{ color: '#007aff', fontWeight: '700' }}>Salvar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={async () => {
          try {
            await api.logout();
          } catch (e) {}
          navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] });
        }}
      >
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    paddingBottom: 40,
    flexGrow: 1, 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  form: {
    marginTop: 10,
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e6e6e6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#c5c5c5ff', 
    color: '#333', 
  },
  textArea: {
    height: 110,
    textAlignVertical: 'top',
  },
  logoutButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#ff3b30',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  saveButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#007aff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default PerfilScreen;