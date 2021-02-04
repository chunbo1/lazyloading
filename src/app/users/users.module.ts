import { RouterModule } from '@angular/router';
import { FooModule } from './../foo/foo.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { AppConfigService } from '../app-config.service';

const routes = [
  { path: '', component: UsersComponent }
];

// const appInitializerFn = (appConfig: AppConfigService) => {
//   return () => {
//     return appConfig.loadAppConfig();
//   };
// };


@NgModule({
  declarations: [UsersComponent],
  imports: [
    //Note: As .forChild() in this case does not return any providers at all,
    // you can also just use the "plain" FooModule in child modules:
    FooModule.forChild(),
    //alternatively we can pass in a parameter as FooConfig
    // FooModule.forRoot({
    //   prefix: 'app.module root prefix'
    // }),
    RouterModule.forChild(routes),
    //Can't bind to 'ngIf' since it isn't a known property of 'mat-label'.
    //You should add CommonModule either in the root component or the related component, 
    //for lazy loaded module, let's add it in users.module
    CommonModule
  ],
  providers: [
    AppConfigService
 ]
})
export class UsersModule { }
