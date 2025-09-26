// Imports

import { chromium, type Browser, type Page } from 'playwright';
import type { returnObject } from '../types';

// Exports

export async function initBrowser(): Promise<returnObject<Browser | null>>{
    try{

        const browser = await chromium.launch({
            headless: false,
        })

        return {
            status: true,
            data: browser,
        }

    } catch(error){

        return {
            status: false,
            data: null,
            error: error as string,
            message: 'Error initializing browser'
        }

    }
}

export async function openPage(browser: Browser, url: string): Promise<returnObject<Page | null>>{
    try{

        const page = await browser.newPage();
        await page.goto(url);
        return {
            status: true,
            data: page,
        }

    } catch(error){
        return {
            status: false,
            data: null,
            error: error as string,
            message: 'Error opening page'
        }
    }
}

export async function closeBrowser(browser: Browser): Promise<returnObject<boolean>>{
    try{

        await browser.close();
        return {
            status: true,
            data: true,
        }

    } catch(error){
        return {
            status: false,
            data: false,
            error: error as string,
            message: 'Error closing browser'
        }
    }
}