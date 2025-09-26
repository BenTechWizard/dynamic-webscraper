// Imports

import { gatherFile } from '../lib/fileManagement';
import { initBrowser, openPage, closeBrowser } from '../lib/playwrightManagment';
import type { configObject } from '../types';

// Script

async function scrape() {
    try{

        const config = await gatherFile('../utils/config.json');
        if(!config.status || !config.data){
            console.log('Error gathering config:', config.error);
            return;
        }

        const configData = config.data as configObject;
        const url = configData.url;

        const browser = await initBrowser();
        if(!browser.status || !browser.data){
            console.log('Error initializing browser:', browser.error);
            return;
        }
        
        const page = await openPage(browser.data, url);
        if(!page.status || !page.data){
            console.log('Error opening page:', page.error);
            return;
        }
        
        const close = await closeBrowser(browser.data);
        if(!close.status || !close.data){
            console.log('Error closing browser:', close.error);
            return;
        }

    } catch (error){
        console.log('Error scraping:', error);
    }
}

// Run Script

scrape();