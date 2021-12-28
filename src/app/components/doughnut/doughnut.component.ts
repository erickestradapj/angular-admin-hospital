import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.css'],
})
export class DoughnutComponent implements OnInit {
  @Input() public title: string = 'No title';

  // Doughnut
  @Input('labels') public doughnutChartLabels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];

  public doughnutChartData: ChartData<'doughnut'> | undefined;

  public doughnutChartType: ChartType = 'doughnut';

  constructor() {}

  ngOnInit(): void {
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        {
          data: [350, 450, 100],
          backgroundColor: ['#6857E6', '#009FEE', '#F02059'],
        },
      ],
    };
  }
}
