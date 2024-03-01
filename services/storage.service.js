import {homedir} from 'os';
import { promises } from 'fs';
import { join } from 'path';

export class Storage {
    static fileDataName = 'weather-cli-data.json';
    static filePath = join(homedir(), this.fileDataName);

    static async isFileExist() {
        try{
            await promises.access(this.filePath)
            return true;
        } 
        catch {
            return false;
        }
    }
    
    static async readFile() {
        return await promises.readFile(this.filePath);
    }
    
    static async saveKeyValue(key, value) {
        let data = {};
    
        if (!await this.isFileExist()) {
            data[key] = value;
            promises.writeFile(this.filePath, JSON.stringify(data));
        }
        else {
            data = await this.readFile();
            try {
                data = JSON.parse(data);
                data[key] = value;
                promises.writeFile(this.filePath, JSON.stringify(data));
            }
            catch {
                const obj = {};
                obj[key] = value;
                //Столкнулся с поблемой что нельзя создать обьект с ключом "key", пришлось обходить таким способом
                promises.writeFile(this.filePath, JSON.stringify(obj));
            }
        }
    }
    
    static async getValue(key) {
        if (this.isFileExist) {
            try {
                let data = await this.readFile();
                data = await JSON.parse(data);
                return data[key];
            }
            catch(e) {
                if (e.message.charAt(0) =! 'U') {
                    throw new Error(`${key} не установлен или файл конфигураций поврежден, если ошибка не уходит необходимо сбросить файл конфигураци -reset`)
                }
                else {
                    throw new Error(e.message + 'getValue')
                }
            }
        }
        throw new Error('Не сохранен файл с конфигурациями')
    }

    static async reset() {
        try {
            await promises.rm(this.filePath);
        }
        catch(e) {
            throw new Error(e.message + ' reset')
        }
    }
}