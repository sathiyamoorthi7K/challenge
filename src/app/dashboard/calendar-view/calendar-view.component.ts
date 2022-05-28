import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { HolidayService } from 'src/app/services/holiday.service';
import { DateInMonth } from 'src/app/DateInMonth';
import { TestingModModule } from '../../testing-mod/testing-mod.module';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent implements OnInit {

  @Input() monthIndex;
  @Input() year;
  @Input() city;

  // assign user selected date to selectedDate
  selectedDate: any;

  // use dateObj to store DateInMonth objects
  dateObj: Array<Array<DateInMonth>> = Array();
  

  /**
   * Fetch holiday list and insert into responseDateObjs
   */
  responseDateObjs: Map<any, any> = new Map();

  constructor(private holidayServiceObj: HolidayService) {

  }

  /**
   * Generate month when year or monthIndex or city changes
   */

  ngOnChanges(changes: SimpleChanges): void {

  }


  ngOnInit() {
  }

  /**
   *  Generate the data for the 42 cells in the table
   *  Property "enabled" to be true for the current month
   *  After generating fetch holiday list.
   */
  monthGenerator() {

    let tObj = new TestingModModule();
    let datearr = [];

    console.log('comp date obj ', this.year);
    console.log('com month ', this.monthIndex);

    let cc = tObj.dateObj1;
    let match = 0;
    cc.forEach(element1 => {
      let c = [];
      
      element1.forEach(element2 => {
        let dd = new DateInMonth();
        dd.enabled = element2.enabled;
        dd.date = element2.date;
        c.push(dd);
        if(element2.date.toString().includes(this.year) && element2.date.toString().includes(this.monthIndex) && match == 0) {
          
          match = 1;
        }
             
      });
      if(match == 1) {
        datearr = c;
      }  
      
      
    });
    this.dateObj = datearr;
    console.log("current month ", datearr);
    
    return datearr;
    //this.dateObj = tObj.convertModel(this.monthIndex);
  }


  /**
   * Fetch holiday list and insert into responseDateObjs
   */
  holidayInitializer() {
 
  }
}
