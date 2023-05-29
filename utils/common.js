import { readFileSync } from 'fs';

export const getConfig = () => {
    try {
        const data = readFileSync('./config.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(err);
    }
}

