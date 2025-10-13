
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FAKE_USERS } from '../components/Usuarios'; 

const PerfilScreen = ({ route, navigation }) => {

  const userId = route?.params?.userId;

  const user = userId ? FAKE_USERS.find(u => u.id === userId) : FAKE_USERS[0];

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Usuário não encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Perfil</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: user.avatarUrl }}
          style={styles.avatar}
        />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nome:</Text>
        <TextInput style={styles.input} value={user.nome} editable={false} />

        <Text style={styles.label}>Idade:</Text>
        <TextInput style={styles.input} value={user.idade} editable={false} />

        <Text style={styles.label}>Área Atuante:</Text>
        <TextInput style={styles.input} value={user.areaAtuante} editable={false} />

        <Text style={styles.label}>Experiência:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={user.experiencia}
          editable={false}
          multiline
        />

        <Text style={styles.label}>Endereço:</Text>
        <TextInput style={styles.input} value={user.endereco} editable={false} />
      </View>
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
});

export default PerfilScreen;