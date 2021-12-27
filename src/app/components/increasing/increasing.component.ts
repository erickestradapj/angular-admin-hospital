import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-increasing',
  templateUrl: './increasing.component.html',
  styleUrls: ['./increasing.component.css'],
})
export class IncreasingComponent implements OnInit {
  @Input('value') progress: number = 80;

  @Output('value') valueOutput: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public changeValue(value: number) {
    if (this.progress >= 100 && value >= 0) {
      this.valueOutput.emit(100);
      this.progress = 100;
      return;
    }

    if (this.progress <= 0 && value < 0) {
      this.valueOutput.emit(0);
      this.progress = 0;
      return;
    }

    this.progress = this.progress + value;
    this.valueOutput.emit(this.progress);
  }
}
