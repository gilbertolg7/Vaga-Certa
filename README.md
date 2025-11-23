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

## Tutorial de Uso

## Guia Rápido — Uso Básico (Usuário)

Siga estes passos simples para usar o aplicativo como candidato, navegando pela interface:

- Abrir o app: ao iniciar, você verá a tela de login/entrada.
- Entrar ou criar conta: escolha entrar com seu e‑mail e senha ou usar a opção de cadastro para criar seu perfil rapidamente (preencha os campos obrigatórios e confirme).
- Explorar vagas: na tela inicial você verá a lista de vagas disponíveis — role a lista para ver mais anúncios.
- Buscar vagas: use a barra de busca para filtrar resultados por empresa ou cargo; os resultados aparecem instantaneamente.
- Ver detalhes: toque em qualquer vaga para abrir a página de detalhes e ler a descrição completa, requisitos e informações da empresa.
- Editar seu perfil: no menu de perfil, atualize seu nome, idade, área de atuação, experiência, endereço ou foto (cole a URL da imagem) e salve as alterações.
- Voltar à lista: use o botão de voltar ou os menus inferiores para retornar à lista de vagas a qualquer momento.
- Sair: use o botão de logout no seu perfil para encerrar a sessão.

Dica: se algo não carregar, verifique sua conexão com a internet; para dispositivos emuladores pode ser necessário ajustar o endereço do servidor nas configurações do app.

## Guia Rápido — Uso Básico (Empresa)

Siga estes passos simples para usar o aplicativo como empresa, navegando pela interface:

- Abrir o app: ao iniciar, faça login com a conta da empresa ou crie uma nova conta usando a opção de cadastro de empresas.
- Painel da empresa: navegue pelo menu inferior para acessar as áreas principais (início, criar vaga, minhas vagas e perfil).
- Criar vaga: toque em "Criar Vaga" ou no botão de adicionar, preencha o título e os detalhes e salve a vaga.
- Visualizar e gerenciar vagas: em "Minhas Vagas" verá a lista de vagas publicadas; use a opção de exclusão (lixeira) para remover vagas e confirme quando solicitado.
- Editar perfil da empresa: no perfil atualize nome, endereço, descrição e logo (cole a URL da imagem) e salve as alterações.
- Voltar à lista: use os botões de navegação ou o menu inferior para retornar à lista de vagas a qualquer momento.
- Sair: use o botão de logout no perfil da empresa para encerrar a sessão.

Dica: se algo não funcionar, verifique a conexão e ajuste o endereço do servidor no app quando estiver usando emulador ou dispositivo físico.
