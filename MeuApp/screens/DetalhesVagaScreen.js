import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const DetalhesVagaScreen = ({ route }) => {
  const vaga = route?.params?.vaga || {};

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.pageTitle}>{vaga.cargo || `Vaga ${vaga.empresa || ''}`}</Text>

        <View style={styles.companyRow}>
          <View style={styles.logoPlaceholder}>
            {vaga.logo ? (
              <Image source={{ uri: vaga.logo }} style={styles.logo} resizeMode="cover" />
            ) : (
              <Text style={styles.logoText}>🏬</Text>
            )}
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.companyName}>{vaga.empresa || 'Empresa'}</Text>
            {vaga.empresaDescricao ? (
              <Text style={styles.companyDesc}>{vaga.empresaDescricao}</Text>
            ) : null}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Informações:</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoLine}>Vaga: {vaga.cargo || '-'}</Text>
          {vaga.descricao ? <Text style={styles.infoLine}>Descrição: {vaga.descricao}</Text> : null}
          <Text style={styles.infoLine}>Escala: {vaga.escala || '-'}</Text>
          {vaga.horario ? <Text style={styles.infoLine}>Horário: {vaga.horario}</Text> : null}
          <Text style={styles.infoLine}>Modelo: {vaga.modelo || '-'}</Text>
          {vaga.localizacao ? <Text style={styles.infoLine}>Localização: {vaga.localizacao}</Text> : null}
          <Text style={styles.infoLine}>Regime: {vaga.regime || '-'}</Text>
          {vaga.requisitos ? <Text style={styles.infoLine}>Requisitos: {vaga.requisitos}</Text> : null}
        </View>

        <Text style={styles.sectionTitle}>Empresa:</Text>
        <Text style={styles.companyLongDesc}>
          {vaga.empresaDescricao || 'Descrição da empresa não disponível. Sera adicionada com a implementação da persistencia de Dados.'}
        </Text>

        <View style={styles.bigImageWrap}>
          {vaga.logo ? (
            <Image source={{ uri: vaga.logo }} style={styles.bigImage} resizeMode="cover" />
          ) : (
            <Image
              source={{ uri: 'https://img.freepik.com/vetores-premium/ilustracao-do-personagem-de-desenho-grafico-vetorial-da-empresa_516790-299.jpg' }}
              style={styles.bigImage}
              resizeMode="cover"
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 20 },
  pageTitle: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 16 },
  companyRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  logoPlaceholder: { width: 64, height: 64, borderRadius: 8, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' },
  logoText: { fontSize: 28 },
  logo: { width: 64, height: 64, borderRadius: 8 },
  companyName: { fontSize: 18, fontWeight: '700' },
  companyDesc: { color: '#666', marginTop: 6 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginTop: 10, marginBottom: 8 },
  infoBox: { backgroundColor: '#fafafa', padding: 12, borderRadius: 8 },
  infoLine: { color: '#444', marginBottom: 6 },
  companyLongDesc: { color: '#555', marginTop: 8, lineHeight: 20 },
  bigImageWrap: { marginTop: 18, alignItems: 'center' },
  bigImage: { width: '100%', height: 180, borderRadius: 12 },
});

export default DetalhesVagaScreen;
