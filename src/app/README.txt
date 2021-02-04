1 App.Module : Root
2 Root router: 
const routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
   //lazy loading:
   { path: 'users', loadChildren: '../app/users/users.module#UsersModule' }
];

3 dashboard and users module both refers to fooModule; 
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FooModule.forRoot({
      prefix: 'app.module root prefix'
    }),
    DashboardModule,
    //UsersModule,
    //lazy loading: need to comment out UsersModule from imports array

4 
const routes = [
  { path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    //Note: As .forChild() in this case does not return any providers at all,
    // you can also just use the "plain" FooModule in child modules:
    FooModule,
    RouterModule.forChild(routes)]
})
export class DashboardModule { }

5
const routes = [
  { path: '', component: UsersComponent }
];

@NgModule({
  declarations: [UsersComponent],
  imports: [
    //Note: As .forChild() in this case does not return any providers at all,
    // you can also just use the "plain" FooModule in child modules:
    FooModule.forChild(), 
    RouterModule.forChild(routes)
  ]
})
export class UsersModule { }

6
export class FooModule { 

  //It seems that a module which is lazily loaded, will be the top-most injector at bootstrap time.
  //To solve this, we have to:
  //Import FooModule WITH a default config in root module (which we can optionally override in App.module)
  static forRoot(config: FooConfig): ModuleWithProviders {
    return {
      ngModule: FooModule,
      providers: [{ 
        provide: FooConfig, useValue: config 
      }]
    };
  }
  //Import FooModule WITHOUT a default config in child modules (in order to use its FooComponent), i.e. User.module
  static forChild(): ModuleWithProviders {
    return {
      ngModule: FooModule
    };
  }
}