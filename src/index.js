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
      showNote();
      break;
    case "Editar":
      searchForTheAnnotationToBeEdited();
      break;
    case "Excluir":
      searchForTheAnnotationToBeDeleted();
      break;
    case "Sair":
      exitNotesCLI();
      break;
  }
}

async function addNotes() {
  const notes = await addNotesDisplay();
  
  if (!notes.noteName || !notes.noteDescription) {
    throw new Error("A anotacao deve ter nome e descricao!");
  }

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
  return data;
}
async function listNotesDisplay() {
  const notesData = await listNotes();

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

  return response;
}
async function fetchAnnotationData() {
  const noteId = await listNotesDisplay();

  const response = await fetch(`${process.env.URL_SERVER}notes/${noteId.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  const data = await response.json();
  
  return data;
}

async function showNote() {
  const notes = await fetchAnnotationData();

  console.log(chalk[notes.noteColor](notes.noteName));
  console.log("-------------------------------------------------------");
  console.log(notes.noteDescription, "\n\n");

  optionsDisplay();
}

async function searchForTheAnnotationToBeEdited() {
  const notes = await fetchAnnotationData();

  const response = await inquirer.prompt([
    {
      type: "list",
      name: "whatToEdit",
      message: "O que voce deseja editar? ",
      choices: [ { name: "Nome", value: "name" }, { name: "Descricao", value: "description"} ]
    }
  ]);

  let newData = null;

  switch (response.whatToEdit) {
    case "name":
      newData = await prompts({
        type: "text",
        name: "newName",
        message: "Digite o novo nome da anotacao: ",
      })

      notes.noteName = newData.newName;
      break;
    case "description":
      newData = await prompts({
        type: "text",
        name: "newDescription",
        message: "Digite a nova descricao da anotacao: ",
      })

      notes.noteDescription = newData.newDescription;
      break;
  }

  await editNote(notes);

  optionsDisplay();
}

async function editNote(newData) {
  try {
    const response = await fetch(`${process.env.URL_SERVER}notes/${newData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newData)
    });

    console.log("Anotacao atualizada com sucesso!\n\n");
  } catch (err) {
    console.log("Erro na atualizacao da anotacao. Erro: ", err, "\n\n");
  }
}

async function searchForTheAnnotationToBeDeleted() {
  const notes = await fetchAnnotationData();

  const response = await inquirer.prompt([
    {
      type: "list",
      name: "doYouReallyWantToDelete",
      message: "Tem certeza que deseja excluir essa anotacao?",
      choices: [ { name: "Sim", value: true }, { name: "Nao", value: false } ]
    }
  ])

  if (response.doYouReallyWantToDelete) {
    await deleteNotes(notes.id);
  }

  optionsDisplay();
} 

async function deleteNotes(notesId) {
  try {
    fetch(`${process.env.URL_SERVER}notes/${notesId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });

    console.log("Anotacao excluida com sucesso!\n\n");
  } catch (err) {
    console.log("Erro ao excluir a anotacao! Erro: ", err, "\n\n");
  }
}

function exitNotesCLI() {
  process.exit(1);
}