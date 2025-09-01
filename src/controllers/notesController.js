import prompts from "prompts";
import inquirer from "inquirer";
import chalk from "chalk";
import { notesService } from "../services/notesService.js";

export const notesController = {
  async add() {
    const note = await prompts([
      { type: "text", name: "noteName", message: "Nome:", validate: v => v ? true : "Obrigatório!" },
      { type: "text", name: "noteDescription", message: "Descrição:" },
      {
        type: "select", name: "noteColor", message: "Cor:",
        choices: ["red", "blue", "green", "yellow"].map(c => ({ title: c, value: c }))
      }
    ]);

    await notesService.create(note);
    console.log(chalk.green("Anotacao adicionada!"));
  },

  async show() {
    const notes = await notesService.list();
    const { id } = await inquirer.prompt([
      {
        type: "list", name: "id", message: "Qual anotacao visualizar?",
        choices: notes.map(n => ({ name: n.noteName, value: n.id }))
      }
    ]);

    const note = await notesService.getById(id);

    console.log(chalk[note.noteColor](note.noteName));
    console.log("-".repeat(40));
    console.log(note.noteDescription);
  },

  async edit() {
    const notes = await notesService.list();
    const { id } = await inquirer.prompt([
      {
        type: "list", name: "id", message: "Qual anotacao editar?",
        choices: notes.map(n => ({ name: n.noteName, value: n.id }))
      }
    ]);

    const note = await notesService.getById(id);

    const { field } = await inquirer.prompt([
      { 
        type: "list", name: "field", message: "Editar:",
        choices: [ { name: "Nome", value: "name" }, { name: "Descricao", value: "description" } ]
      }
    ]);

    if (field === "name") {
      const { newName } = await prompts({ type: "text", name: "newName", message: "Novo nome:" });
      note.noteName = newName;
    } else {
      const { newDescription } = await prompts({ type: "text", name: "newDescription", message: "Nova descrição:" });
      note.noteDescription = newDescription;
    }

    await notesService.update(note);
    console.log(chalk.green("Anotacao atualizada!"));
  },

  async remove() {
    const notes = await notesService.list();
    const { id } = await inquirer.prompt([
      { 
        type: "list", name: "id", message: "Qual anotação excluir?",
        choices: notes.map(n => ({ name: n.noteName, value: n.id }))
      }
    ]);

    const { confirm } = await  inquirer.prompt([
      { type: "confirm", name: "confirm", message: "Tem certeza?", default: false }
    ]);

    if (confirm) {
      await notesService.remove(id);
      console.log(chalk.red("Anotacao excluida!"));
    }
  }
}
