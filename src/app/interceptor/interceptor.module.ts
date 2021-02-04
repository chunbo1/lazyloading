import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { App1Component } from './app1/app1.component';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CustomHttpInterceptor} from './custom-http-interceptor';
//https://www.youtube.com/watch?v=Q8hm0vilhUU&ab_channel=RomanianCoder

const routes = [
  { path: '', component: App1Component }
];


@NgModule({
  declarations: [App1Component],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    //BrowserModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      //https://www.tektutorialshub.com/angular/angular-providers/
      useClass: CustomHttpInterceptor,
      multi: true
    }
  ]

})
export class InterceptorModule { }
