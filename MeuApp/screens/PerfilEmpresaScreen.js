import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Linking, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PerfilEmpresaScreen = ({ navigation }) => {
  const empresa = {
    nome: 'Tech Solutions Ltda',
    endereco: 'Av. das Nações, 1234 - Centro',
    area: 'Tecnologia e Serviços',
    descricao:
      'Somos uma empresa especializada em soluções de infraestrutura e software, com foco em inovação e atendimento ao cliente.',
    avatarUrl: require('../assets/Gemini_Generated_Image_wxmttkwxmttkwxmt.png'),
    linkedin: 'https://www.linkedin.com/',
    instagram: 'https://www.instagram.com/',
    facebook: 'https://www.facebook.com/',
  };

  const openUrl = (url) => {
    if (url) Linking.openURL(url).catch(() => {});
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Perfil da Empresa</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.avatarContainer}>
          <Image source={empresa.avatarUrl} style={styles.avatar} />
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Empresa:</Text>
          <Text style={styles.value}>{empresa.nome}</Text>

          <Text style={styles.label}>Endereço:</Text>
          <Text style={styles.value}>{empresa.endereco}</Text>

          <Text style={styles.label}>Área:</Text>
          <Text style={styles.value}>{empresa.area}</Text>

          <Text style={styles.label}>Descrição:</Text>
          <Text style={[styles.value, styles.textArea]}>{empresa.descricao}</Text>

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
});

export default PerfilEmpresaScreen;
