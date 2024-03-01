import chalk from 'chalk'

export class Log {
    static error(error) {
        console.log(chalk.bgRed(' ERROR ') + ' ' + error)
    }

    static success(msg) {
        console.log(`${chalk.bgGreen(' SUCCESS ')} \n${msg}`)
    }

    static help() {
        console.log(
            `
${chalk.bgCyan('HELP')}
Для того чтобы пользоваться этой утилитой необходимо получить api ключ
на сайте openweathermap.org
    Команды:
-h помошь
-t [TOKEN] Установка api токена для получения данных о погоде
-s
            `
            )
    }
}