import { injectable } from "inversify";
const chalk = require('chalk');

@injectable()
export class Logger {
    constructor() {
    }

    public init(object: string) {
        console.log(chalk.italic(`Init: ${object} initialized.`))
    }

    public alert(message: string) {
        console.log(chalk.yellow(`Alert: ${message}`))
    }

    public error(message: string) {
        console.log(chalk.red(`Error: ${message}`))
    }

    public warning(message: string) {
        console.log(chalk.redBright(`Warning: ${message}`))
    }

    public info(message: string) {
        console.log(chalk.blueBright(`Info: ${message}`))
    }

    public debug(message: any) {
        console.log(chalk.white(`Debug: ${JSON.stringify(message)}`))
    }
 }