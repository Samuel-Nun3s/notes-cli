import inquirer from "inquirer";
import { notesController } from "../controllers/notesController.js";

export async function showMenu() {
  const { option } = await inquirer.prompt([
    {
      type: "list",
      name: "option",
      message: "Escolha uma opcao:",
      choices: [
        { name: "Adicionar", value: "add"    },
        { name: "Listar",    value: "list"   },
        { name: "Editar",    value: "edit"   },
        { name: "Excluir",   value: "delete" },
        { name: "Sair",      value: "exit"   }
      ]
    }
  ]);

  switch (option) {
    case "add": await notesController.add(); break;
    case "list": await notesController.show(); break;
    case "edit": await notesController.edit(); break;
    case "delete": await notesController.remove(); break;
    case "exit": process.exit(0);
  }

  showMenu();
}
