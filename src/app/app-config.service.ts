import {enableProdMode, Injectable } from '@angular/core';
import {HttpBackend, HttpClient } from '@angular/common/http';
import { AppConfig } from './app-config';

@Injectable()
export class AppConfigService {

    private AppConfig:  AppConfig;
    private httpClient: HttpClient;

    constructor(private handler: HttpBackend) {
        this.httpClient = new HttpClient(handler);        
    }

    loadAppConfig() {
        return this.httpClient.get<AppConfig>('assets/appConfig.json')
            .toPromise()
            .then(data => {
                console.log(`got config: `, data);
                this.AppConfig = data;
        });
    }

    getConfig(): AppConfig {
        return this.AppConfig;
    }
s
}
