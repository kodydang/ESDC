import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class LoginService {
  constructor(private httpClient: HttpClient) { }

  login() {
    // return this.httpClient.get(`${ROUTES.EVENT_DATA_URL}/announcement-list.json`)
    // return this.httpClient.get('https://oneportalservice.jelmoli.ch/api/Announcement')
    //   .pipe(
    //     map((body: any[]) => {
    //       // console.log(body);
    //       return body;
    //     },
    //         catchError(() => of('Error, could not load joke :-(')),
    //     ),
    //   );
  }
}
