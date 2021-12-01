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
  - 
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


