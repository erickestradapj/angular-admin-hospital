import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncreasingComponent } from './increasing/increasing.component';
import { FormsModule } from '@angular/forms';
import { DoughnutComponent } from './doughnut/doughnut.component';

import { NgChartsModule } from 'ng2-charts';
import { ModalImageComponent } from './modal-image/modal-image.component';

@NgModule({
  declarations: [IncreasingComponent, DoughnutComponent, ModalImageComponent],
  exports: [IncreasingComponent, DoughnutComponent, ModalImageComponent],
  imports: [CommonModule, FormsModule, NgChartsModule],
})
export class ComponentsModule {}
