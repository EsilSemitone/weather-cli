#!usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { ApiConnect } from "./services/api.service.js";
import { Log } from "./services/log.service.js";
import { Storage } from "./services/storage.service.js";

async function initCli() {
    const args = getArgs(process.argv); 

    if  (args.h) {
        Log.help();
    }

    if  (args.s) {
        if (args.s === true) {
            Log.error('Не передан город')
            return;
        }
        try {
            await Storage.saveKeyValue('city', args.s);
            Log.success('Город успешно установлен')
        }
        catch(e) {
            Log.error(e.message)
        }

    }

    if  (args.t) {
        if (args.t === true) {
            Log.error('Не передан token')
            return;
        }
        try {
            Storage.saveKeyValue('token', args.t);
            Log.success('Токен успешно установлен')
        }
        catch(e) {
            Log.error(e.message)
        }
    }

    if  (args.r) {
        Storage.reset();
        Log.success('Файл с конфигурациями успешно сброшен! \n Нехобходимо заполнить город и токен!')
    }

    else if (Object.keys(args).length == 0) {
        try {
            const res = await ApiConnect.getWeatherToday()
            Log.success(`${res.name}
На улице ${res.weather[0].description} ${res.main.temp} градусов
`)
            // Log.success(res)
        } catch (error) {
            Log.error(error.message)
        }

    }

}

initCli();