import "dotenv/config";
import { Command } from "commander";
import figlet from "figlet";
import { showMenu } from "./src/cli/menu.js";

const program = new Command();

program
  .name("notes-cli")
  .description("Sistema CLI de anotacoes com Nodejs")
  .version("1.0.0");

program
  .command("start")
  .description("Iniciar o sistema")
  .action(() => showMenu());

figlet("Notes CLI!", (err, data) => {
  if (err) {
    console.log('Erro ao gerar titulo: ', err);
    return;
  }
  console.log(data);
  program.parse(process.argv);
});
