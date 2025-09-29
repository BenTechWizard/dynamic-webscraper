// Exports

export interface returnObject <T>{
    status: boolean;
    data: T;
    error?: string;
    message?: string;
}

export interface preScrapeAction {
    selector: string;
    action: string;
    value: string;
}

export interface collection {
    name: string;
    selector: string;
    attribute: string;
}

export interface configObject {
    url: string;
    headless: boolean;
    preScrapeActions: preScrapeAction[];
    collections: collection[];
}