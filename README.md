# 📒 Notes CLI

Um **sistema de anotações em linha de comando (CLI)** feito em **Node.js**, que permite **adicionar, listar, editar e excluir** anotações de forma simples e interativa.

![notes-cli](https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js)
![npm](https://img.shields.io/badge/npm-%3E%3D9-blue?logo=npm)
![CLI](https://img.shields.io/badge/type-CLI-orange)

---

## ✨ Funcionalidades

* 📌 **Adicionar** novas anotações com título, descrição e cor personalizada.
* 📜 **Listar** todas as anotações salvas.
* 📝 **Editar** título ou descrição de anotações existentes.
* ❌ **Excluir** anotações específicas.
* 🎨 Cores personalizadas para destacar as anotações.

---

## 📂 Estrutura do Projeto

```
.
├── index.js                 # Ponto de entrada (commander + figlet)
└── src
    ├── cli
    │   └── menu.js          # Menu principal (inquirer)
    ├── controllers
    │   └── notesController.js # Lógica de orquestração
    ├── services
    │   └── notesService.js  # Comunicação com API (CRUD)
    └── ...
```
---

## 🛠️ Tecnologias Utilizadas

* [Node.js](https://nodejs.org/)
* [Commander](https://www.npmjs.com/package/commander) → comandos CLI
* [Inquirer](https://www.npmjs.com/package/inquirer) → perguntas interativas
* [Prompts](https://www.npmjs.com/package/prompts) → inputs simples
* [Chalk](https://www.npmjs.com/package/chalk) → cores no terminal
* [Figlet](https://www.npmjs.com/package/figlet) → ASCII art para título
* [dotenv](https://www.npmjs.com/package/dotenv) → variáveis de ambiente

---

## ⚙️ Instalação

1. Clone o repositório:

```bash
git clone https://github.com/samuel-nun3s/notes-cli.git
cd notes-cli
```

2. Instale as dependências:

```bash
npm install
```

3. Configure a URL do servidor (API de notas) em um arquivo `.env`:

```env
URL_SERVER=http://localhost:3000/
```

> Você pode usar [JSON Server](https://github.com/typicode/json-server) para simular uma API REST.

---

## ▶️ Uso

1. Inicie o CLI:

```bash
node index.js start
```

2. Escolha uma opção no menu:

```
? Escolha uma opção: (Use as setas ↑ ↓)
❯ Adicionar
  Listar
  Editar
  Excluir
  Sair
```

---

## 📸 Exemplo

Adicionar anotação:

```
Digite o nome da anotação: "Estudar Node.js"
Digite a descrição da anotação: "Revisar sobre modularização"
Escolha uma cor para essa anotação: Blue

✔ Anotação adicionada com sucesso!
```

Listar anotação:

```
? Escolha a anotação que quer visualizar:
❯ Estudar Node.js

Estudar Node.js   (em azul)
-------------------------------------------------------
Revisar sobre modularização
```

---

## 📌 Melhorias Futuras

* [ ] Implementar autenticação de usuário.
* [ ] Permitir busca de anotações por palavra-chave.
* [ ] Exportar notas para arquivo `.txt` ou `.json`.
* [ ] Testes automatizados.
* [ ] Publicar no **npm** para instalação global (`npm i -g notes-cli`).

---

## 👨‍💻 Autor

Feito com ❤️ por **[Samuel Nunes](https://github.com/samuel-nun3s)**
Contribuições são bem-vindas!