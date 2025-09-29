// Imports

import { chromium, type Browser, type Page, type ElementHandle, type Locator } from 'playwright';
import type { returnObject } from '../types';

// Exports

export async function initBrowser(headless: boolean): Promise<returnObject<Browser | null>>{
    try{

        const browser = await chromium.launch({
            headless: headless,
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

export async function getElement(page: Page, selector: string, timeout: number = 5000): Promise<returnObject<Locator | null>>{
    try{

        const locator = page.locator(selector);

        await locator.waitFor({ state: "attached", timeout });

        return {
            status: true,
            data: locator,
        }

    } catch(error){
        return {
            status: false,
            data: null,
            error: error as string,
            message: 'Error getting element'
        }
    }
}

export async function clickElement(element: Locator): Promise<returnObject<boolean>>{
    try{

        const elementHandle = await element.elementHandle();
        if(!elementHandle){
            throw new Error(`Element not found: ${element}`);
        }

        await elementHandle.click();

        return {
            status: true,
            data: true,
        }

    } catch(error){

        return {
            status: false,
            data: false,
            error: error as string,
            message: 'Error clicking element'
        }

    }
}

export async function sendKeys(element: Locator, keys: string): Promise<returnObject<boolean>>{
    try{

        await element.fill(keys);

        return {
            status: true,
            data: true,
        }

    } catch(error){
        return {
            status: false,
            data: false,
            error: error as string,
            message: 'Error sending keys'
        }
    }
}

export async function getAttribute(element: Locator, attribute: string): Promise<returnObject<string | null>>{
    try{

        const elementHandle = await element.elementHandle();
        if(!elementHandle){
            throw new Error(`Element not found: ${element}`);
        }

        const attributeValue = await elementHandle.getAttribute(attribute);
        if(!attributeValue){
            throw new Error(`Attribute not found: ${attribute}`);
        }

        return {
            status: true,
            data: attributeValue,
        }

    } catch(error){

        return {
            status: false,
            data: null,
            error: error as string,
            message: 'Error getting attribute'
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