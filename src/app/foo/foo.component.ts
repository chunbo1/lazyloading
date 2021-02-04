import { FooConfig } from './foo.config';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-foo',
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.component.css']
})
export class FooComponent  {
  @Input() label:string;
 
  prefix:string = 'Default prefix';

  constructor(config: FooConfig) {
    this.prefix = config.prefix;
  }
}
