import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import VagaCard from '../components/VagaCard';
import { VAGAS_DISPONIVEIS } from './HomeScreen';

const EmpresaHomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Vagas Disponíveis </Text>
        <FlatList
          data={VAGAS_DISPONIVEIS}
          renderItem={({ item }) => <VagaCard vaga={item} />}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>

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
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  container: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginVertical: 20,
  },
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
  menuLabel: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default EmpresaHomeScreen;
