import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-app1',
  templateUrl: './app1.component.html',
  styleUrls: ['./app1.component.css']
})
export class App1Component implements OnInit {
  title = 'http-interceptor-example';

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
        // Executing 3 HTTP Requests

        this.http.get('http://jsonplaceholder.typicode.com/users')
        .subscribe(data => {
          // TODO: Do stuff with data
        });
  
      this.http.get('http://jsonplaceholder.typicode.com/posts/2')
        .subscribe(data => {
          // TODO: Do stuff with data
        });
  
      this.http.get('http://jsonplaceholder.typicode.com/posts/2/comments')
        .subscribe(data => {
          // TODO: Do stuff with data
        });
  }

}
