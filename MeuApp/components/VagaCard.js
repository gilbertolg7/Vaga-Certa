
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const VagaCard = ({ vaga }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.cardContainer}>
      <View style={styles.iconContainer}>
        <Ionicons name="business" size={32} color="#666" />
      </View>
      <View style={styles.textContainer}>
        {vaga.empresa ? <Text style={styles.company}>{vaga.empresa}</Text> : null}
        <Text style={styles.cargo}>{vaga.cargo || vaga.titulo}</Text>
        <Text style={styles.metaLine}>Escala: {vaga.escala || '-'}</Text>
        <Text style={styles.metaLine}>Requisitos: {vaga.requisitos || '-'}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DetalhesVaga', { vaga })}>
        <Text style={styles.buttonText}>Acessar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1, 
  },
  company: {
    fontSize: 16,
    color: '#222',
    fontWeight: '700',
    marginBottom: 4,
  },
  cargo: {
    fontSize: 15,
    color: '#444',
    marginBottom: 6,
  },
  metaLine: { fontSize: 13, color: '#777', marginTop: 6 },
  button: {
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default VagaCard;