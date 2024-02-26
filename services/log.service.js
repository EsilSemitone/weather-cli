import chalk from 'chalk'

export class Log {
    static error(error) {
        console.log(chalk.bgRed(' ERROR ') + ' ' + error)
    }

    static success(msg) {
        console.log(chalk.bgGreen(' SUCCESS ') + ' ' + msg)
    }

    static help() {
        console.log(
            `
            ${chalk.bgCyan('HELP')}
            Для того чтобы пользоваться
            
            `
            )
    }
}