import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EChartsOption } from 'echarts';

import { importProvidersFrom } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts'; // Import the ngx-echarts module
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-pie-chart',
  imports: [ReactiveFormsModule, NgxEchartsModule, CommonModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css',
})
export class PieChartComponent {
  chartForm: FormGroup;
  chartOption: EChartsOption | null = null;

  constructor(private fb: FormBuilder) {
    // Initialize the form group with a FormArray for dynamic inputs
    this.chartForm = this.fb.group({
      data: this.fb.array([
        this.createDataEntry(), // Initial entry (first pair of label and value)
      ]),
    });
  }

  // Method to create a single data entry (label and value)
  createDataEntry(): FormGroup {
    return this.fb.group({
      label: ['', Validators.required],
      value: [null, [Validators.required, Validators.min(0)]],
    });
  }

  // Get the data array (for dynamic rows)
  get dataArray(): FormArray {
    return this.chartForm.get('data') as FormArray;
  }

  // Method to add a new data entry
  addData(): void {
    this.dataArray.push(this.createDataEntry());
  }
  removeData(index: number): void {
    this.dataArray.removeAt(index);
    this.generateChart(); // Refresh chart after deletion
  }

  // Method to generate the pie chart based on user input
  generateChart(): void {
    const data = this.chartForm.value.data;

    this.chartOption = {
      title: {
        text: 'Pie Chart',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          name: 'Values',
          type: 'pie',
          radius: '50%',
          data: data.map((entry: { label: string; value: number }) => ({
            value: entry.value,
            name: entry.label,
          })),
          label: {
            show: true,
            position: 'outside', // Position outside the slice
            formatter: '{b}', // Only display the name of the label
            fontSize: 14,
            color: '#000',
            distance: 15, // Adjust this value to ensure the label is outside the slice
            overflow: 'none', // Ensure the text is not truncated
          },

          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  }
}
