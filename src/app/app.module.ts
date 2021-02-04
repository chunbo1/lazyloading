import { AppConfigService } from './app-config.service';
import { UsersModule } from './users/users.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { RouterModule } from '@angular/router';
import { FooModule } from './foo/foo.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FooConfig } from './foo/foo.config';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { InterceptorModule } from './interceptor/interceptor.module';
import { CsvUploadComponent } from './csv-upload/csv-upload.component';
import { GridDemoComponent } from './grid-demo/grid-demo.component';
import { AgGridModule } from 'ag-grid-angular';

const routes = [
  { path: '', redirectTo: 'dashboardXXX', pathMatch: 'full' },  
  { path: 'grid', component: GridDemoComponent},  
   //start lazy loading:
   { path: 'users', loadChildren: () =>  import('../app/users/users.module').then(m => UsersModule) },
   { path: 'interceptor', loadChildren: () => import('../app/interceptor/interceptor.module').then(m => InterceptorModule) }
];

const appInitializerFn = (appConfig: AppConfigService) => {
  return () => {
    return appConfig.loadAppConfig();
  };
};

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    MaterialModule,

    //the following AppRoutingModule is never used, our routing is defined within app.module.ts
    //AppRoutingModule,
    FooModule.forRoot({
      prefix: 'app.module root prefix'
    }),
    DashboardModule,
    ///UsersModule,
    //lazy loading: need to comment out UsersModule from imports array
    //We will now have an issue: the UsersModule - which is loaded lazily 
    //will not inherit the custom config from the root module, but the default config from the FooModule.
    //It seems that a module which is lazily loaded, will be the top-most injector at bootstrap time.
    
    AgGridModule.withComponents([]),
    RouterModule.forRoot(routes)
  ],  
  declarations: [
    AppComponent,
    CsvUploadComponent,
    GridDemoComponent
  ],
  //The service provided in the @ngModule of the root module or any eagerly loaded module are available to be injected everywhere in the application.
  //The services provided in the @ngModule of the lazy loaded module are available to be injected in that module and every component, pipe or directive belonging to that Module.
  //The services provided in the @Component, @pipe or @Directive are available to be injected in that component and all the child components
  //But if we register the service in @ngModule and also in Component A. Component A always gets a new instance of the service. While other components gets the instance of the service registered in @ngModule
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }  ,
    DatePipe,
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      //https://www.tektutorialshub.com/angular/angular-providers/
      useFactory: appInitializerFn,
      multi: true,
      deps: [AppConfigService]
    }
 ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
