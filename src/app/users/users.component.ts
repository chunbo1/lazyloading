import { AppConfigService } from './../app-config.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CsvUploadData } from 'src/models/csv-upload-data';
import{HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { CsvUploadService } from '../services/csv-upload.service';
import { AppConfig } from '../app-config';
import { CsvUploadComponent } from '../csv-upload/csv-upload.component';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  private fileUploadSubscription: Subscription;
  public modes: string[];
  public uploadInProgress: boolean;
  public uploadResult: {success: boolean; validationErrors: null; uploadError: null };
  private config: AppConfig;


  constructor(
    public dialogRef: MatDialogRef<UsersComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: CsvUploadData,
    private csvUploadService: CsvUploadService,
    private appConfigService : AppConfigService
    ) { 
      this.uploadInProgress = false;
      this.uploadResult = {
        success: false,
        uploadError: null,
        validationErrors : null
      };
      this.config = appConfigService.getConfig();
    }

  ngOnInit(): void {
    this.modes = [ 'DryRun', 'Production' ];
    this.data.mode = this.modes[0];
    this.data.file = null;
    this.data.username = 'dasun';
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

  openUploadCsvDialog(): void {
    const data = new CsvUploadData();
    data.username = 'david';
    //pass in a UI component
    this.dialog.open(CsvUploadComponent, {
      width: '350px',
      data,
      disableClose: true
    });
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



  onCancelClick(): void {
    this.stopUpload();
    this.dialogRef.close();
  }

  private stopUpload() {
    if (this.fileUploadSubscription) {
      this.fileUploadSubscription.unsubscribe();
      this.fileUploadSubscription = null;
    }
  }


}
