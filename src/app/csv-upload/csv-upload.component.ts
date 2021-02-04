import { CsvUploadService } from './../services/csv-upload.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CsvUploadData } from 'src/models/csv-upload-data';
import { AppConfig } from '../app-config';
import { AppConfigService } from '../app-config.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-csv-upload',
  templateUrl: './csv-upload.component.html',
  styleUrls: ['./csv-upload.component.css']
})
export class CsvUploadComponent implements OnInit {
  private config:AppConfig;
  private fileUploadSubscription: Subscription;
  public modes: string[];
  public uploadInProgress: boolean;
  public uploadResult: { success: boolean; validationErrors: null; uploadError: null };

  constructor(
    public dialogRef: MatDialogRef<CsvUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CsvUploadData,
    private appConfigService: AppConfigService,
    private csvUploadService: CsvUploadService
  ) { 
    this.config = appConfigService.getConfig();
    this.uploadInProgress = false;
    this.uploadResult = {
      success: false,
      uploadError: null,
      validationErrors : null
    };
  }

  ngOnInit(): void {
    this.modes = [ 'DryRun', 'Production' ];
    this.data.mode = this.modes[0];
    this.data.file = null;
    this.data.username = 'dasun';
  }

  onCancelClick(): void {
    this.stopUpload();
    this.dialogRef.close();
  }


  onUploadClick(): void {
    this.uploadResult = {success: false, uploadError: null, validationErrors : null};
    this.uploadInProgress = true;
    this.fileUploadSubscription = this.csvUploadService.postFile(this.data)
      .subscribe(
        result => { this.processResult(result); }, 
        error => { this.handleError(error); } 
      )
  }

  private processResult(result: HttpResponse<Blob>) {
    console.log(result);
    this.uploadResult = {success: true, uploadError: null, validationErrors: null};
    const a = document.createElement('a');
    a.href = URL.createObjectURL(result.body);
    a.download = 'result-' + Date.now() + '.csv';
    a.click();
  }

  private handleError(error: any) {
    console.error(error);
    let uploadError: any;
    let validationErrors: any;
    if (error == null || error === ''){
      uploadError = 'Unexpected error while uploading file!';
    } else {
      try {
      // error might be a json object 
      validationErrors = JSON.parse(error);
      uploadError = 'Input file did not pass validation:';
      } catch {
        //or a string in case of any other error
        uploadError = error;
      }
    }
    this.uploadResult = {success: false, uploadError, validationErrors};
  }

  handleFileInput(event: any){
    this.data.file = event.target.files.item(0);
  }

  private stopUpload() {
    if (this.fileUploadSubscription) {
      this.fileUploadSubscription.unsubscribe();
      this.fileUploadSubscription = null;
    }
  }
  


}
