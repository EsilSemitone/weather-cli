import {homedir} from 'os';
import { promises } from 'fs';
import { join } from 'path';

export class Storage {
    static fileDataName = 'weather-cli-data.json';
    static filePath = join(homedir, fileDataName);

    static async isFileExist() {
        return promises.access(this.filePath)
    }
    
    static async readFile() {
        return await promises.readFile(this.filePath);
    }
    
    static async saveKeyValue(key, value) {
        let data = {};
    
        if (!this.isFileExist) {
            data[key] = value;
            promises.writeFile(this.filePath, JSON.stringify(data));
        }
        else {
            data = await readFile();
            data = JSON.parse(data);
            data[key] = value;
            promises.writeFile(this.filePath, JSON.stringify(data));
        }
    }
    
    static async getValue(key) {
        let data = await readFile();
        data = JSON.parse(data);
        return data[key] || null;
    }
}

// const fileDataName = 'weather-cli-data.json'
// const filePath = join(homedir, fileDataName)

