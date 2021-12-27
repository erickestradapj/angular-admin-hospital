import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncreasingComponent } from './increasing/increasing.component';
import { FormsModule } from '@angular/forms';
import { DoughnutComponent } from './doughnut/doughnut.component';

import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [IncreasingComponent, DoughnutComponent],
  exports: [IncreasingComponent, DoughnutComponent],
  imports: [CommonModule, FormsModule, NgChartsModule],
})
export class ComponentsModule {}
