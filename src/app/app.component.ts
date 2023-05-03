import { Component } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UF2ExIanSoles';
  contingut: any;
  constructor(private http: HttpClient) {
    //Exercici 1_________________________________
    this.llistaAssigInfo();
    this.signeZ();
  }
  llistaAssigInfo(){
    this.http.get('http://localhost:3080/EX1').subscribe(contingut => {
      this.contingut = contingut;
      console.log(contingut);
    });
  }
  //Exericic2______________________________-___
  signeZ() {
    this.http.post<any>('http://localhost:3080/EX2', {}).subscribe(
      response => console.log(response),
      error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 400 && error.error === 'ALREADY_EXISTS') {
            console.log('Noi vas tard ja esta creat');
          } else {
            console.error(error.error);
          }
        } else {
          console.error(error);
        }
      }
    );
  }
  //Exercici 4_________________________________


}

