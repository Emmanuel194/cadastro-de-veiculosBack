# Cadastro de Veículos (Back-end) 🚗

Bem-vindo ao repositório do **Back-end do Cadastro de Veículos**! Siga as instruções abaixo para configurar e rodar o sistema no seu ambiente local.

---

## 🛠 Tecnologias Utilizadas
- **Express.js**: Framework para criação de servidores
- **TypeScript**: Tipagem estática
- **PostgreSQL**: Banco de dados relacional
- **Dotenv**: Gerenciamento de variáveis de ambiente
- **Cors**: Configuração de acesso ao servidor
- **Postman**: Teste de rotas

---

## 📂 Estrutura do Projeto
A estrutura do projeto está organizada em diretórios para facilitar o entendimento:
- **controllers**: Contém a lógica de cada endpoint.
- **routes**: Define as rotas da API.
- **config**: Configuração do banco de dados (PostgreSQL).

---

## 🚀 Instruções de Configuração

### Clone o Repositório com codigo abaixo
``git clone https://github.com/Emmanuel194/cadastro-de-veiculosBack.git``

após clonar acesse a pasta utilizando:

``cd cadastro-de-veiculosBack``

de primeiro instale as dependências com:

``npm install``

após instalar você vai renomear o arquivo chamado .envexemple(.env) substitua USER, PASSWORD, HOST, PORT e DATABASE pelas credenciais do seu banco.

# Configuração do Banco de Dados

Depois de preencha as credenciais do .env, agora precisamos criar as tabelas dentro do banco de dados:

no seu banco execute o seguinte codigo:

``CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
``
também execute esse aqui para a tabela de veículos:

``CREATE TABLE vehicles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  plate VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
``
Após isso certifique-se de que essas tabelas estejam criadas no banco de dados que você configurou no arquivo .env.

Por fim antes de rodar o servidor back-end acesse as Rotas da API, irei compartilhar o workspace do Postman com as rotas ja listadas para uso aqui embaixo.

acessando esse link você consegue visualizar as rota da api : https://www.postman.com/cod3tech/workspace/cadastro-de-carros/request/29723495-f3867732-f689-4ff5-8639-17a7f939991b?action=share&creator=29723495&ctx=documentation

# agora com tudo configurado , precisamos rodar o servidor.
utlize o comando:

``npm run dev``

O servidor será iniciado na porta 3000.
