import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

const COLOR = {
  RED: 'rgba(255, 99, 132, 0.2)',
  BLUE: 'rgba(54, 162, 235, 0.2)',
  YELLOW: 'rgba(255, 206, 86, 0.2)',
  GREEN: 'rgba(75, 192, 192, 0.2)',
  PURPLE: 'rgba(153, 102, 255, 0.2)',
  ORANGE: 'rgba(255, 159, 64, 0.2)',
};

@Component({
  selector: 'app-report-year',
  templateUrl: './report-year.component.html',
  styleUrls: ['./report-year.component.scss'],
})
export class ReportYearComponent implements OnInit {
  charYear: any;

  constructor() { }

  ngOnInit() {
    this.charYear = new Chart('chartYear', {
      type: 'bar',
      data: {
        labels: [
          'Jan', 'Feb', 'Mat', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Currence',
            data: [9, 34, 700, 5, 7, 8, 9, 4, 5, 43, 7, 5],
            fill: false,
            lineTension: 0.1,
            backgroundColor: COLOR.RED,
            borderColor: 'rgba(255,99,132,1)',
            borderWitdh: 1,
          },
          // {
          //   label: 'Number',
          //   data: [9, 34, 700, 5, 7, 8, 9, 4, 5, 43, 7, 5],
          //   fill: true,
          //   lineTension: 1,
          //   backgroundColor: COLOR.BLUE,
          //   borderColor: 'rgba(255,99,132,1)',
          //   borderWitdh: 1,
          // },
        ],
      },
      option: {
        title: {
          display: true,
          text: 'Line Chart',
        },
        scale: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }],
        },
      },
    });
  }

}
