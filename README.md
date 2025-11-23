# 📱 Vaga Certa

> **Projeto Mobile - Entrega Final**

## 📋 Sobre o Projeto

O **Vaga Certa** é um aplicativo mobile desenvolvido com o objetivo de facilitar a divulgação e a busca por oportunidades de emprego na região Sudoeste do Paraná.

De modo simplificado e objetivo, a plataforma conecta empresas e candidatos, permitindo a visualização de anúncios de vagas disponíveis com informações detalhadas, incluindo:
- Descrição da vaga
- Empresa contratante
- Regime de contratação
- Modelo de trabalho

---

## 🎨 Protótipos e Design

ℹ️ **Nota:** Os protótipos das telas e versões anteriores do design podem ser encontrados no histórico de branches das entregas passadas deste repositório.

---

## 🚀 Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [NPM](https://www.npmjs.com/)

---

## 📦 Como Rodar o Projeto

Para executar o aplicativo em seu ambiente de desenvolvimento, siga o passo a passo abaixo.

### Pré-requisitos

- Ter o `Node.js` instalado em sua máquina.
- Ter o aplicativo `Expo Go` instalado no celular (Play Store / App Store) ou um emulador Android/iOS configurado.
- Ter o `PgAdmin` instalado e configurar o arquivo `env`com suas credenciais: user, senha, porta e nome do database.

### Passo a Passo

1. **Acesse a pasta do projeto**

   No terminal, navegue até o diretório da aplicação:

   ```bash
   cd MeuApp
   ```

2. **Instale as dependências**

   Execute o comando abaixo para instalar os módulos listados no `package.json`:

   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**

   Inicie o Metro Bundler (servidor do Expo):

   ```bash
   npx expo start
   ```

4. **Execute o aplicativo**

   Com o servidor rodando, você verá um QR Code no terminal. Para visualizar o aplicativo:

   - No celular: abra o `Expo Go`, toque em "Scan QR Code" e aponte a câmera para o código exibido.
   - No emulador Android: pressione a tecla `a` no terminal para abrir o app no emulador.
   - No simulador iOS (macOS): pressione a tecla `i` no terminal para abrir no simulador.


### *Modelo de Banco de Dados (PostgreSQL)**

![Modelo de Banco de Dados](Modelo%20banco%20de%20Dados%20PostgreSQL/esquema-de-vagas-de-emprego_1.png)
