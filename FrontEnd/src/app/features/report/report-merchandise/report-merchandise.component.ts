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
  selector: 'app-report-merchandise',
  templateUrl: './report-merchandise.component.html',
  styleUrls: ['./report-merchandise.component.scss'],
})
export class ReportMerchandiseComponent implements OnInit {
  charMer: any;

  constructor() { }

  ngOnInit() {
    this.charMer = new Chart('chartMer', {
      type: 'bar',
      data: {
        labels: [
          'Laptop', 'Tivi', 'Refrigerator', 'Soundbar'],
        datasets: [
          {
            label: 'Currence',
            data: [700, 600, 100, 50],
            fill: false,
            lineTension: 0.1,
            backgroundColor: COLOR.RED,
            borderColor: 'rgba(255,99,132,1)',
            borderWitdh: 1,
          },
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
