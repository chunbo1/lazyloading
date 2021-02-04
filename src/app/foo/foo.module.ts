import { Optional } from '@angular/core';
import { SkipSelf } from '@angular/core';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FooComponent } from './foo.component';
import { FooConfig } from './foo.config';
//AAA
//https://stackoverflow.com/questions/62755093/angular-error-generic-type-modulewithproviderst-requires-1-type-arguments
declare module "@angular/core" {
  interface ModuleWithProviders<T = any> {
      ngModule: Type<T>;
      providers?: Provider[];
  }
}

@NgModule({
  declarations: [FooComponent],
  //The reason we added the FooComponent to the exports array, is that other modules that import this module, 
  //can now use the FooComponent as well.
  exports: [FooComponent],

  //if keep the following 6 lines, users module will use it as Default Prefix; We should comment out it to use root prefix
  providers: [{ 
    provide: FooConfig, 
    useValue: {
      prefix: 'Default Prefix'
    }
  }]
})
export class FooModule { 

  constructor(@Optional() @SkipSelf() parentModule?: FooModule) {
    // if (parentModule) {
    //   throw new Error(
    //     'fooModule is already loaded. Import it in the AppModule only');
    // }
  }
  //It seems that a module which is lazily loaded, will be the top-most injector at bootstrap time.
  //To solve this, we have to:
  //Import FooModule WITH a default config in root module (which we can optionally override in App.module)
  //forRoot() takes a service configuration object and returns a ModuleWithProviders, 
  //which is a simple object with the following properties:
  //ngModule: in this example, the FooModule class
  //providers: the configured providers
    static forRoot(config: FooConfig): ModuleWithProviders {
    return {
      ngModule: FooModule,
      providers: [{ 
        provide: FooConfig, 
        useValue: config 
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

  //BBB instead of using AAA, we can put it outside FooModule Class
  // export const fooModuleWithConfig: ModuleWithProviders = {
  //   ngModule: FooModule,
  //   providers: [FooConfig]
  // };
  // export const fooModuleWithoutConfig: ModuleWithProviders = {
  //   ngModule: FooModule
  // };
