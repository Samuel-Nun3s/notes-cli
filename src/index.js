import { Command } from "commander";
import prompts from "prompts";
import figlet from "figlet";
import inquirer from "inquirer";

const program = new Command();

program
  .name("notes-cli")
  .description("Sistema CLI de anotacoes com Nodejs")
  .version("1.0.0");

program
  .command("start")
  .description("Iniciar o sistema")
  .action(async () => {
    const answer = await optionsDisplay();

    optionsMenu(answer.option);
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
      choices: ["Adicionar", "Listar", "Editar", "Excluir"]
    }
  ]);

  return answers;
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
  }
}

function addNotes() {
  
}

function listNotes() {

}

function editNotes() {

}

function deleteNotes() {

}