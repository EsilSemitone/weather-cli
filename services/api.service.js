import axios from 'axios';
import { Storage } from './storage.service.js';

export class ApiConnect {
    
    static token = '';
    static city = '';

    /**
     * @param {string} token
     */
    static set apiToken(token) {
        this.token = token;
    }

    static get apiToken() {
        if (this.token == '' || this.token == undefined) {
            throw new Error('Не установлен Token, установить -t {Token}')
        }
        return this.token;
    }

    /**
     * @param {string} city
     */
    static set apiCity(city) {
        this.city = city;
    }

    static get apiCity() {
        if (this.city == '' || this.city == undefined) {
            throw new Error('Не установлен Город, установить -s {City}')
        }
        return this.city;
    }

    static async updateArgs() {
        try {
            this.apiToken = await Storage.getValue('token');
            this.apiCity = await Storage.getValue('city');
        }
        catch(e) {
            throw new Error(`Один из параметров не установлен или файл конфигураций \n поврежден, если ошибка не уходит необходимо сбросить файл конфигураций -reset`)
        }
    }

    static async getWeatherToday() {
        await this.updateArgs();
        try {
            const {data} = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                   q: this.apiCity,
                   appid: this.apiToken,
                   units: 'metric',
                   lang: 'ru'
                }
            });
    
            return data;
        }
        catch(e) {
            if (e?.response?.status == 400) {
                throw new Error('Неверно указан город')
            }
            else if (e?.response?.status == 401) {
                throw new Error('Неверно указан токен')
            }
            else {
                throw new Error(e.message)
            }
        }
    }

    static getWeatherFourDays() {
        return;
    }
}