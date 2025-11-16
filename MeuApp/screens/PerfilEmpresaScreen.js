import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Linking, SafeAreaView, TextInput, Alert, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../services/api';

const PerfilEmpresaScreen = ({ navigation }) => {
  const [empresa, setEmpresa] = useState({
    linkedin: 'https://www.linkedin.com/',
    instagram: 'https://www.instagram.com/',
    facebook: 'https://www.facebook.com/',
  });
  const [logoUrl, setLogoUrl] = useState('');
  const [logoModalVisible, setLogoModalVisible] = useState(false);
  const [tempLogoUrl, setTempLogoUrl] = useState('');

  const openUrl = (url) => {
    if (url) Linking.openURL(url).catch(() => {});
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await api.getProfile();
        const p = res.profile;
        if (!mounted) return;
        setEmpresa(prev => ({
          ...prev,
          nome: p.nome || prev.nome,
          endereco: p.endereco || prev.endereco,
          area: p.area || prev.area,
          descricao: p.descricao || prev.descricao,
        }));
        setLogoUrl(p.logo || '');
      } catch (err) {
        const msg = err?.error || err?.message || 'Erro ao buscar perfil';
        if (err && (err.error === 'Invalid token' || err.error === 'No authorization header')) {
          navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] });
          return;
        }
        Alert.alert('Erro', String(msg));
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>{empresa.nome || 'Perfil da Empresa'}</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={() => { setTempLogoUrl(logoUrl || ''); setLogoModalVisible(true); }}>
            <Image source={logoUrl ? { uri: logoUrl } : (empresa.avatarUrl )} style={styles.avatar} />
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Empresa:</Text>
          <TextInput style={styles.input} value={empresa.nome} onChangeText={(text) => setEmpresa(prev => ({ ...prev, nome: text }))} />

          <Text style={styles.label}>Endereço:</Text>
          <TextInput style={styles.input} value={empresa.endereco} onChangeText={(text) => setEmpresa(prev => ({ ...prev, endereco: text }))} />

          <Text style={styles.label}>Área:</Text>
          <TextInput style={styles.input} value={empresa.area} onChangeText={(text) => setEmpresa(prev => ({ ...prev, area: text }))} />

          <Text style={styles.label}>Descrição:</Text>
          <TextInput style={[styles.input, styles.textArea]} value={empresa.descricao} onChangeText={(text) => setEmpresa(prev => ({ ...prev, descricao: text }))} multiline />

          <Text style={styles.label}>Redes Sociais:</Text>
          <View style={styles.socialRow}>
            <TouchableOpacity onPress={() => openUrl(empresa.linkedin)} style={styles.socialButton}>
              <Ionicons name="logo-linkedin" size={28} color="#0A66C2" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openUrl(empresa.instagram)} style={styles.socialButton}>
              <Ionicons name="logo-instagram" size={28} color="#C13584" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openUrl(empresa.facebook)} style={styles.socialButton}>
              <Ionicons name="logo-facebook" size={28} color="#1877F2" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={async () => {
            try {
              const payload = { nome: empresa.nome, endereco: empresa.endereco, area: empresa.area, descricao: empresa.descricao };
              await api.updateProfile(payload);
              Alert.alert('Sucesso', 'Perfil da empresa atualizado');
            } catch (err) {
              const msg = err?.error || err?.message || 'Erro ao atualizar';
              Alert.alert('Erro', String(msg));
            }
          }}
        >
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>

        <Modal visible={logoModalVisible} transparent animationType="slide">
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: 20 }}>
            <View style={{ backgroundColor: '#fff', borderRadius: 8, padding: 16 }}>
              <Text style={{ fontWeight: '700', marginBottom: 8 }}>Editar logo da empresa (cole o link)</Text>
              <TextInput placeholder="https://..." value={tempLogoUrl} onChangeText={setTempLogoUrl} style={{ borderWidth: 1, borderColor: '#e6e6e6', padding: 8, borderRadius: 6, marginBottom: 12 }} />
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <TouchableOpacity onPress={() => setLogoModalVisible(false)} style={{ marginRight: 12 }}>
                  <Text style={{ color: '#666' }}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={async () => {
                  try {
                    await api.updateProfile({ logo: tempLogoUrl });
                    setLogoUrl(tempLogoUrl);
                    setLogoModalVisible(false);
                    Alert.alert('Sucesso', 'Logo atualizado');
                  } catch (err) {
                    const msg = err?.error || err?.message || 'Erro ao atualizar logo';
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
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { paddingTop: 24, paddingHorizontal: 20, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  backButton: { width: 40 },
  title: { fontSize: 20, fontWeight: '700' },
  avatarContainer: { alignItems: 'center', marginBottom: 20 },
  avatar: { width: 110, height: 110, borderRadius: 55 },
  form: { marginTop: 10 },
  label: { fontWeight: '600', marginBottom: 6, marginTop: 12 },
  value: { backgroundColor: '#c5c5c5ff', padding: 12, borderRadius: 8, color: '#333' },
  textArea: { height: 110, textAlignVertical: 'top' },
  socialRow: { flexDirection: 'row', marginTop: 8 },
  socialButton: { marginRight: 16 },
  bottomMenu: {
    height: 64,
    borderTopWidth: 1,
    borderColor: '#e6e6e6',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  logoutButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#ff3b30',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
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
    marginVertical: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e6e6e6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    color: '#333',
  },
});

export default PerfilEmpresaScreen;
