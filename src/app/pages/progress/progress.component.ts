import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent implements OnInit {
  progress1: number = 25;
  progress2: number = 35;

  constructor() {}

  ngOnInit(): void {}

  get getProgress1() {
    return `${this.progress1}%`;
  }

  get getProgress2() {
    return `${this.progress2}%`;
  }

  changedValueChild(value: number) {
    console.log('Hey!!!', value);
    this.progress1 = value;
  }
}
