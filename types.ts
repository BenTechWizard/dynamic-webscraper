// Exports

export interface returnObject <T>{
    status: boolean;
    data: T;
    error?: string;
    message?: string;
}

export interface configObject {
    url: string;
}