
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, StatusBar } from 'react-native';
import VagaCard from '../components/VagaCard';

export const VAGAS_DISPONIVEIS = [
  {
    id: '1',
    empresa: 'AutoParts',
    cargo: 'Contrata-se Atendente de caixa',
    escala: '6x1 Diurna',
    requisitos: 'Sem experiência prévia',
    modelo: 'Presencial',
    regime: 'CLT',
    localizacao: 'Rua das Flores, 123 - Centro',
    descricao: 'Atendimento ao cliente, operação de caixa, organização da loja.',
  },
  {
    id: '2',
    empresa: 'Suporte Técnico - Teste Telecom',
    cargo: 'Contrata-se Suporte técnico',
    escala: '5x2 das 8h até as 18h',
    requisitos: 'Experiência em Redes',
    modelo: 'Presencial',
    regime: 'CLT',
    localizacao: 'Rua das Flores, 123 - Centro',
    descricao: 'Atendimento a chamados, manutenção de redes, suporte ao usuário.',
  },
  {
    id: '3',
    empresa: 'Responsavel de Loja - Mercado Tonhao',
    cargo: 'Contrata-se Responsavel de Loja',
    escala: '6x1 Diurna',
    requisitos: 'Experiência em gestão de pessoas',
    modelo: 'Presencial',
    regime: 'CLT',
    localizacao: 'Rua das Flores, 123 - Centro',
    descricao: 'Gestão de equipe, controle de estoque, atendimento ao cliente.',
  },
  {
    id: '4',
    empresa: 'Responsavel de Loja - Mercado Tonhao',
    cargo: 'Contrata-se Responsavel de Loja',
    escala: '6x1 Diurna',
    requisitos: 'Experiência em gestão de pessoas',
    modelo: 'Presencial',
    regime: 'CLT',
    localizacao: 'Rua das Flores, 123 - Centro',
    descricao: 'Gestão de equipe, controle de estoque, atendimento ao cliente.',
  },
    {
    id: '5',
    empresa: 'Suporte Técnico - Teste Telecom',
    cargo: 'Contrata-se Suporte técnico',
    escala: '5x2 das 8h até as 18h',
    requisitos: 'Experiência em Redes',
    modelo: 'Presencial',
    regime: 'CLT',
    localizacao: 'Rua das Flores, 123 - Centro',
    descricao: 'Gestão de equipe, controle de estoque, atendimento ao cliente.',
  },
    {
    id: '6',
    empresa: 'AutoParts',
    cargo: 'Contrata-se Atendente de caixa',
    escala: '6x1 Diurna',
    requisitos: 'Sem experiência prévia',
    modelo: 'Presencial',
    regime: 'CLT',
    localizacao: 'Rua das Flores, 123 - Centro',
    descricao: 'Gestão de equipe, controle de estoque, atendimento ao cliente.',
  },
];

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Vagas Disponíveis</Text>
        <FlatList
          data={VAGAS_DISPONIVEIS}
          renderItem={({ item }) => <VagaCard vaga={item} />}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
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
});

export default HomeScreen;