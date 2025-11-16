
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const VagaCard = ({ vaga, onDelete, titleBold }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.cardContainer}>
      <View style={styles.iconContainer}>
        {(vaga.logo || (vaga.Company && vaga.Company.logo)) ? (
          <Image source={{ uri: vaga.logo || vaga.Company.logo }} style={styles.logoImage} />
        ) : (
          <Ionicons name="business" size={32} color="#666" />
        )}
      </View>
      <View style={styles.textContainer}>
        {(vaga.empresa || (vaga.Company && vaga.Company.nome) || vaga.nome) ? (
          <Text style={styles.company}>{vaga.empresa || (vaga.Company && vaga.Company.nome) || vaga.nome}</Text>
        ) : null}
        <Text style={[styles.cargo, titleBold && styles.cargoBold]}>{vaga.titulo || vaga.title || vaga.cargo}</Text>
        <Text style={styles.metaLine}>Escala: {vaga.escala || vaga.scale || '-'}</Text>
        <Text style={styles.metaLine}>Modelo: {vaga.modelo || vaga.model || '-'}</Text>
        <Text style={styles.metaLine}>Requisitos: {vaga.requisitos || vaga.requirements || '-'}</Text>
      </View>
      {onDelete ? (
        <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(vaga.id)}>
          <Ionicons name="trash" size={20} color="#fff" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DetalhesVaga', { vaga })}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
      )}
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
    marginRight: 12,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 44,
    height: 44,
    borderRadius: 8,
    resizeMode: 'cover',
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
  deleteButton: {
    backgroundColor: '#c00',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cargoBold: {
    fontWeight: '800',
  },
});

export default VagaCard;