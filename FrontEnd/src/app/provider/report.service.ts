import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Chart } from 'chart.js';

const API_URL = './../../assets/data-json/test.json';
@Injectable()
export class ReportService {
  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(`${API_URL}`)
      .pipe(
        map((body: any[]) => {
          body.forEach((value, index, array) => {
            // console.log(value);
            // console.log(array[index]);
          });
          return body;
        },
            catchError(() => of('Error, could not load joke :-(')),
        ),
      );
  }
  dailyForecast() {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get(`${API_URL}`)
      .pipe(
        map((body: any[]) => {
          body.forEach((value, index, array) => {
            // console.log(value);
            // console.log(array[index]);
          });
          return body;
        },
            catchError(() => of('Error, could not load joke :-(')),
        ),
      );
  }

}
