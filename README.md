# Prova técnica - Full Stack - Processo seletivo ROIT BANK

## O Desafio

Desenvolva um projeto utilizando Nest (https://docs.nestjs.com/) e Vue 2 ou 3 (https://vuejs.org/), que satisfaça os seguintes itens:

1. Cadastro CRUD de usuário com os seguintes atributos:
  - ID
  - Nome
  - Idade

2. Consulta de endereço utilizando WebService da ViaCEP (https://viacep.com.br/), vincular ao usuário e guardar informações como:
  - Logradouro
  - CEP
  - Cidade
  - UF
  - Código IBGE
  - Outras informações;
  
3. Consulta de endereço utilizando o WebService do GitHub (https://api.github.com/search/users?q=<USERNAME>), vincular ao usuário e guardar informações como:
  - Login;
  - ID;
  - Avatar;
  - URL;
  - Repositórios;
  - Outras informações;
  
### Poderão ser um diferencial na sua entrega:
  - Testes unitários;
  - Documentação dos endpoints com apiDoc ou Swagger;
  - Readme de como testar a aplicação;
  - Banco de dados não relacional;
  - Sistema de cache;
  - Sistema de autenticação com JWT;
  - Bibliotecas da ROIT;
      - https://www.npmjs.com/package/roit-environment
      - https://www.npmjs.com/package/@roit/roit-model-mapper
      - https://www.npmjs.com/package/@roit/roit-response-handler
      - https://www.npmjs.com/package/@roit/roit-firestore-connector

  - Criptografia - adicionar o campo email no usuário para ser usado na criptografia
  ---
 
  ## Rodando o projeto localmente
  O projeto foi desenvolvido utilizando dois diretórios distintos, sendo eles o backend (desenvolvido com Nest.js) e o frontend (desenvolvido com Vue.js).
  
  ### Pré-requisitos
   [Node.js](https://nodejs.org/en/), [Npm](https://www.npmjs.com/), [MongoDB](https://www.mongodb.com/) 
  
  ### Clonando o repositório
  Para preparar a aplicação, clone este repositório, o qual possui ambos os diretórios do projeto (i.e. `backend` e `frontend`)
  
  ````bash
  # Clone o repositório
  $ git clone git@github.com:leonardo-pinto/roit-bank-challenge.git
  ````
  
  ### Entre no diretório do projeto clonado
  
  ````bash
  # Acesse o diretório do projeto clonado
  $ cd roit-bank-challenge
  ````
  
  ## Backend
  ### Entre no diretório backend
  
   ````bash
  # Acesse o diretório do backend
  $ cd backend
  ````
  
  ### Dentro do diretório backend, instale as dependências
  ````bash
  # Instale as dependências necessárias
  $ npm install
  ````
  
  ### MongoDB
  Para rodar a aplicação, é necessário que o MongoDB esteja instalado corretamente (https://www.mongodb.com/) 
  Após se certificar que o MongoDB está instalado, inicie o MongoDB.
  
  ```bash
  # Inicie o MongoDB
  $ mongo
  ```
  
  Caso o MongoDB esteja instalado, porém inativo
    
  ```bash
  # Inicie o MongoDB
  $ sudo service mongod start
  ```
  
  ### Configurando variáveis de ambiente
  Para que a aplicação funcione corretamente, é necessário a configuração das variáveis de ambiente.
  
  Na raíz do diretório backend, há um arquivo de exemplo (.env.example) com as chaves que devem ser configuradas.
  Para isso, retira a extensão .example, ou crie um arquivo .env.
  
  ```bash
  /backend/.env
  # Configure as variáveis de ambiente
   DATABASE_URL: é a url com a qual o MongoDB deverá se conectar (e.g. mongodb://localhost/roit-challenge);
   PORT: porta usada para a conexão;
  ```
  
  ** Atenção: caso as variáveis não sejam definidas a aplicação não irá funcionar corretamente **
  
  ### Rodando o backend
  Após se certificar que as dependências foram instaladas, que o MongoDB está rodando e as variáveis de ambiente configuradas:
  
   ```bash
  # Ainda dentro do diretório backend, inicie o servidor
  $ npm run start
  ```
  ### Executando os testes no backend
  
  Testes unitários
   ```bash
  # Rodando os testes unitários
  $ npm run test
  
  $ Rodando os testes unitários com relatório de cobertura
  $ npm run test:cov
  ```
  
  Testes E2E (End-To-End)
   ```bash
  # Rodando os testes e2e
  $ npm run test:e2e
  
  $ Rodando os testes e2e com relatório de cobertura
  $ npm run test:e2e:cov
  ```
  
  ## Documentação da API
  A documentação do backend foi realizada utilizando o Swagger (https://docs.nestjs.com/openapi/introduction).
  
  Para acessar a documentação utilize o endpoint `/api`: (e.g. http://localhost:PORTA/api/, no qual a PORTA é a variável PORT setada no .env) 
 
  ## Frontend
  ### Entre no diretório frontend
  
  ````bash
  # Acesse o diretório do frontend
  $ cd frontend
  ````
  
  ### Dentro do diretório frontend, instale as dependências
  ````bash
  # Instale as dependências necessárias
  $ npm install
  ````
  
  ### Configurando variáveis de ambiente
  Para que a aplicação funcione corretamente, é necessário a configuração das variáveis de ambiente.
  
  Na raíz do diretório frontend, há um arquivo de exemplo (.env.example) com as chaves que devem ser configuradas.
  Para isso, retira a extensão .example, ou crie um arquivo .env.
  
  ```bash
  /frontend/.env
  # Configure as variáveis de ambiente
    VUE_APP_PORT: é a url utilizada pelo backend, ou seja, a porta deve ser a mesma configurada no backend;
  ```
  
  ** Atenção: caso as variáveis não sejam definidas a aplicação não irá funcionar corretamente **
  
  ### Rodando o frontend
  ```bash
  npm run serve
  ```
  
  # Autor

  Leonardo Pinto

https://www.linkedin.com/in/leonardo-antonio-pinto/
  
  
  
  


