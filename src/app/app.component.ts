import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PieChartComponent } from './pie-chart/pie-chart.component';

@Component({
  selector: 'app-root',
  imports: [PieChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'chart-generator';
}
