// Imports

import fs from 'fs';
import path from 'path';
import type { returnObject } from '../types';
import { fileURLToPath } from "url";

// Constants

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Exports

export async function gatherFile(filePath: string): Promise<returnObject<any | null>>{
    try{

        const configPath = path.resolve(__dirname, filePath);
        const fileContents = fs.readFileSync(configPath, "utf-8");
        const jsonData = JSON.parse(fileContents);
        return {
            status: true,
            data: jsonData,
        }

    } catch(error){
        return {
            status: false,
            data: null,
            error: error as string,
            message: 'Error gathering file'
        }
    }
}