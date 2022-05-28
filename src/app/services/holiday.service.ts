import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { TestingModModule } from '../testing-mod/testing-mod.module';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  // **************** Dashboard **************** //

  /**
   * Request using GET method and return Observable
   * Use the URL 'api/cities'
   */
   obs = new Observable((observer) => {
      observer.next("1")
      observer.next("2")
      observer.next("3")
      observer.next("4")
      observer.next("5")
  });
  getCities(): Observable<any> {
    
    let tObj = new TestingModModule();
    
    return this.http.get('api/cities').pipe(map(cities => { return tObj.city1[0]} ));
  }


 // **************** Holiday View **************** //

  /**
   * Request using POST method and send JSON object eg: {city_name:'cityA',month:1, year: 2020}
   * Return Observable
   * Use the URL 'api/monthly'
   */
  getHolidays(city: string, monthIndex: number, year: number): Observable<any> {

    const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    const body = { city_name: city, month: monthIndex+1, year: year };

  

    return this.http.post('api/monthly', body, {headers}).pipe(map(res => {
      return { city_name: 'sdsdsds',
      year: 2019,
      month: 6}
    }
      
      ));
        
    
  }

  

}
