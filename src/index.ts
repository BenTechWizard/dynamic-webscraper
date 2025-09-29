// Imports

import { gatherFile } from '../lib/fileManagement';
import { initBrowser, openPage, getElement, clickElement, sendKeys, getAttribute, closeBrowser } from '../lib/playwrightManagment';
import type { configObject } from '../types';

// Script

async function scrape() {
    try{

        let data: any = {};

        const config = await gatherFile('../utils/config.json');
        if(!config.status || !config.data){
            console.log('Error gathering config:', config.error);
            return;
        }

        const configData = config.data as configObject;
        const url = configData.url;
        const headless = configData.headless;
        const preScrapeActions = configData.preScrapeActions;
        const collections = configData.collections;

        const browser = await initBrowser(headless);
        if(!browser.status || !browser.data){
            console.log('Error initializing browser:', browser.error);
            return;
        }
    
        const page = await openPage(browser.data, url);
        if(!page.status || !page.data){
            console.log('Error opening page:', page.error);
            await closeBrowser(browser.data);
            return;
        }

        for(const action of preScrapeActions){

            const element = await getElement(page.data, action.selector);
            if(!element.status || !element.data){
                console.log('Error getting element:', element.error);
                await closeBrowser(browser.data);
                return;
            }

            let actionResult = null;

            if(action.action === 'click'){

                actionResult = await clickElement(element.data);

            } else if(action.action === 'sendKeys'){

                actionResult = await sendKeys(element.data, String(action.value));

            } else {
                console.log('Invalid action:', action.action);
                await closeBrowser(browser.data);
                return;
            }

            if(!actionResult.status || !actionResult.data){
                console.log('Error performing action:', actionResult.error);
                await closeBrowser(browser.data);
                return;
            }

        }

        for(const collection of collections){

            const element = await getElement(page.data, collection.selector);
            if(!element.status || !element.data){
                console.log('Error getting element:', element.error);
                await closeBrowser(browser.data);
                return;
            }

            const attributeValue = await getAttribute(element.data, collection.attribute);
            if(!attributeValue.status || !attributeValue.data){
                console.log('Error getting attribute value:', attributeValue.error);
                await closeBrowser(browser.data);
                return;
            }
            
            data[collection.name] = attributeValue.data;

        }
    
        const close = await closeBrowser(browser.data);
        if(!close.status || !close.data){
            console.log('Error closing browser:', close.error);
            return;
        }

        console.log("Data Scraped:\n", JSON.stringify(data, null, 2));

    } catch (error){
        console.log('Error scraping:', error);
    }
}

// Run Script

scrape();