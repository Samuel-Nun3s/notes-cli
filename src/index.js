import "dotenv/config";
import { Command } from "commander";
import prompts from "prompts";
import figlet from "figlet";
import inquirer from "inquirer";
import chalk from "chalk";

const program = new Command();

program
  .name("notes-cli")
  .description("Sistema CLI de anotacoes com Nodejs")
  .version("1.0.0");

program
  .command("start")
  .description("Iniciar o sistema")
  .action(() => {
    optionsDisplay();
  });

figlet("Notes CLI!", (err, data) => {
  if (err) {
    console.log('Erro ao gerar texto: ', err);
    return;
  }
  console.log(data);
  program.parse(process.argv);
});

async function optionsDisplay() {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "option",
      message: "Escolha uma opcao:",
      choices: ["Adicionar", "Listar", "Editar", "Excluir", "Sair"]
    }
  ]);

  optionsMenu(answers.option);
}

function optionsMenu(option) {
  switch (option) {
    case "Adicionar":
      addNotes();
      break;
    case "Listar":
      listNotes();
      break;
    case "Editar":
      editNotes();
      break;
    case "Excluir":
      deleteNotes();
      break;
    case "Sair":
      exitNotesCLI();
      break;
  }
}

async function addNotes() {
  const notes = await addNotesDisplay();
  console.log("notes =>", notes);

  addNotesToTheDatabase(notes);

  optionsDisplay();
}
async function addNotesDisplay() {
  const response = await prompts([
    {
      type: "text",
      name: "noteName",
      message: "Digite o nome da anotacao:",
      validate: value => value.trim() === "" ? "Esse campo é obrigatório!" : true
    },
    {
      type: "text",
      name: "noteDescription",
      message: "Digite a descricao da anotacao:",
      validate: value => value.trim() === "" ? "Esse campo é obrigatório!" : true
    },
    {
      type: "select",
      name: "noteColor",
      message: "Escolha uma cor para essa anotacao:",
      choices: [
        { title: "Red", value: "red"}, 
        { title: "Blue", value: "blue"}, 
        { title: "Green", value: "green"}, 
        { title: "Yellow", value: "yellow"}
      ]
    }
  ]);

  return response;
}
function addNotesToTheDatabase(annotationData) {
  if (annotationData) {
    try {
      fetch(`${process.env.URL_SERVER}notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(annotationData)
      });
    } catch (err) {
      console.log(err);
    }
  }
}

async function listNotes() {
  const notes = await fetch(`${process.env.URL_SERVER}notes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })

  const data = await notes.json();
  listNotesDisplay(data);
}

async function listNotesDisplay(notesData) {
  const notesNames = notesData.map(n => ({
    name: n.noteName,
    value: n.id
  }));

  const response = await inquirer.prompt([
    {
      type: "list",
      name: "id",
      message: "Escolha a anotacao que quer visualizar:",
      choices: notesNames
    }
  ])

  fetchAnnotationData(response);
}

async function fetchAnnotationData(noteId) {
  const response = await fetch(`${process.env.URL_SERVER}notes/${noteId.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  const data = await response.json();
  
  showNote(data);
}

function showNote(notes) {
  console.log(chalk[notes.noteColor](notes.noteName));
  console.log("-------------------------------------------------------");
  console.log(notes.noteDescription, "\n\n");
  optionsDisplay();
}

function editNotes() {

}

function deleteNotes() {

}

function exitNotesCLI() {
  process.exit(1);
}