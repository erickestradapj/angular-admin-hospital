import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styleUrls: ['./promises.component.css'],
})
export class PromisesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.getUsers().then((users) => {
      console.log(users);
    });
    /*  const promise = new Promise((resolve, reject) => {
      if (false) {
        resolve('Hello world');
      } else {
        reject('Something went wrong');
      }
    });

    promise
      .then((message) => {
        console.log(message);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log('Init finished'); */
  }

  public getUsers() {
    return new Promise((resolve, reject) => {
      fetch('https://reqres.in/api/users?page=2')
        .then((resp) => resp.json())
        .then((body) => resolve(body.data));
    });
  }
}
