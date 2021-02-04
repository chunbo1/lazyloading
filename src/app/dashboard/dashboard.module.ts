import { FooModule } from './../foo/foo.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes = [
  { path: 'dashboardXXX', component: DashboardComponent}
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    MaterialModule,
    CommonModule,
    FooModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)

  ]
})
export class DashboardModule { 
  
}

