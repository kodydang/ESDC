import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ReportService } from 'src/app/provider/report.service';
import { Chart } from 'chart.js';
import { catchError, map } from 'rxjs/operators';

const COLOR = {
  RED: 'rgba(255, 99, 132, 0.2)',
  BLUE: 'rgba(54, 162, 235, 0.2)',
  YELLOW: 'rgba(255, 206, 86, 0.2)',
  GREEN: 'rgba(75, 192, 192, 0.2)',
  PURPLE: 'rgba(153, 102, 255, 0.2)',
  ORANGE: 'rgba(255, 159, 64, 0.2)',
};

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  charYear: any;
  elementRef: any;
  typeSelected = 'Year';
  typeReport = ['Year', 'Merchandise'];

  chart = 'chartYear';
  charMer: any;

  constructor(
    private reportService: ReportService,
  ) { }

  ngOnInit() {
  }

  onTypeClick(value) {
    console.log(value);
    this.typeSelected = value;
  }
}
