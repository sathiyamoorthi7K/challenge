import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HolidayService } from '../services/holiday.service';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
 
  // assign selected city to selectedCity
  selectedCity: string = null;

  // use year to display year
  year;

  // add month names in monthInAlphabets Array
  monthInAlphabets: Array<any> = [  ];

  // Use month index to get month in monthInAlphabets
  monthIndex = 0;

  // get cities and assign it to cities
  cities: Array<any>;

  constructor(public dialog: MatDialog, private holidayServiceObj: HolidayService, private route: Router,private http: HttpClient) {

  }

  /**
   * Set the current month index to monthIndex and set current year to year
   * get cities
   */
  ngOnInit() {

  }

  /**
   *  To navigate month
   *  if "flag" is 0 which means that user click left arrow key <-
   *  if "flag" is 1 which means that user click right arrow key ->
   */
  navigationArrowMonth(flag) {
    if( flag == 0) {
      this.monthIndex = this.monthIndex-1;
    } else if(flag == 1) {
      this.monthIndex = this.monthIndex +1;
    }

    if(this.monthIndex > 12) {
      this.monthIndex = 1;
      this.year = this.year+1;
    } else if( this.monthIndex < 0) {
      this.monthIndex = 11;
      this.year = this.year -1;
    }
    
  }

  /**
   *  To navigate year
   *  if "flag" is 0 which means that user onclick left arrow key <-
   *  if "flag" is 1 which means that user onclick right arrow key ->
   */
  navigationArrowYear(flag) {
    if( flag == 0) {
      this.year = this.year-1;
    } else if(flag == 1) {
      this.year = this.year +1;
    }
  }

  /**
   * To disable navigation for month
   * Return true to disable
   * Return false to enable
   */
  monthNavigatorValidation() {
    if(this.monthIndex == 11 || this.monthIndex == 0) {
      
      return true;
    } else {
      
      return false;
    }
  }

  /**
   * To disable navigation for year
   * return true to disable
   * return false to enable
   */
  yearNavigatorValidation() {
    if(this.monthIndex == 11 || this.monthIndex == 0) {      
      return true;
    } else {      
      return false;
    }
   
  }

  // Get cities list and assign the response value to cities
  getCities() {
    console.log('city list ',this.http.get('/cities'));
  }


}
