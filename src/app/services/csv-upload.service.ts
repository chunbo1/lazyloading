
import { CsvUploadData } from './../../models/csv-upload-data';
import { Injectable } from '@angular/core';
import { AppConfig } from '../app-config';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ObserveOnOperator } from 'rxjs/internal/operators/observeOn';
import { AppConfigService } from '../app-config.service';

@Injectable({
    providedIn: 'root'
})
export class CsvUploadService {

    private config: AppConfig;

    constructor(
        private http: HttpClient,
        private dataPipe: DatePipe,
        private appConfigService: AppConfigService,
        ) {
        this.config = appConfigService.getConfig();
        console.log('CsvUploadService.config is loaded');
    }

    postFile(uploadData: CsvUploadData): Observable<any> {
        //const endpoint = 'https://localhost:44390/Enrich/import/csv/recovery';
        const endpoint = this.config.CLMServiceUrl;
        const formData = new FormData();
        formData.append('csvFile', uploadData.file, uploadData.file.name);
        const params = new HttpParams().append('mode', uploadData.mode).append('user', uploadData.username);
        return this.http
        .post(endpoint, formData, {params, responseType: 'blob' as 'json', observe: 'response'})
        .pipe(catchError(this.parseErrorBlob));
    }

    private parseErrorBlob(err: HttpErrorResponse): Observable<any> {
        console.error(err);
        const reader: FileReader = new FileReader();

        const obs = new Observable((observer: any) => {
            reader.onloadend = (e) => {
                observer.error(reader.result as string);
                observer.complete();
            };
        })
        reader.readAsText(err.error);
        return obs;
    }
}