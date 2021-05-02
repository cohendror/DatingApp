import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tests-errors',
  templateUrl: './tests-errors.component.html',
  styleUrls: ['./tests-errors.component.css']
})
export class TestsErrorsComponent implements OnInit {

  baseUrl = 'https://localhost:5001/api/';
  validationErrors: string[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  //404
  get404Error() {
    this.http.get(this.baseUrl + 'buggy/not-found')
    .subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  //400
  get400Error() {
    this.http.get(this.baseUrl + 'buggy/bad-request')
    .subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  //500
  get500Error() {
    this.http.get(this.baseUrl + 'buggy/server-error')
    .subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  //401
  get401Error() {
    this.http.get(this.baseUrl + 'buggy/auth')
    .subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  //400ValitationError
  get400ValidationError() {
    this.http.post(this.baseUrl + 'account/register',{})
    .subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
      this.validationErrors = error;
    })
  }

}
