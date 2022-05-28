import { TestBed } from '@angular/core/testing';

import { HolidayService } from './holiday.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { TestingModModule } from '../testing-mod/testing-mod.module';

describe('HolidayService', () => {
  let service: HolidayService;
  let httpTestingController: HttpTestingController;
  let tObj = new TestingModModule();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: '', component: DashboardComponent }]),
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HolidayService);
  });


  describe('http', () => {

    afterEach(() => {
      httpTestingController.verify();
    });
    
    it('Test  test getCities should use Get method and should return Observable', () => {
     
      service.getCities().subscribe((res) => console.log('response from get ', res));      
      let req = httpTestingController.expectOne('api/cities');
      expect(req.request.method).toBe('GET');
    });

    it('Test getHolidays should use post method and should return Observable', () => {
      service.getHolidays(tObj.getHolidayReq1.city_name, tObj.getHolidayReq1.month - 1, tObj.getHolidayReq1.year).subscribe();
      let req = httpTestingController.expectOne('api/monthly');
      expect(req.request.method).toBe('POST');
      console.log('request log ', req.request.body);
      console.log('tObj.getHolidayReq1 ', tObj.getHolidayReq1);
      expect(req.request.body).toEqual(tObj.getHolidayReq1);

      service.getHolidays(tObj.getHolidayReq2.city_name, tObj.getHolidayReq2.month - 1, tObj.getHolidayReq2.year).subscribe();
      req = httpTestingController.expectOne('api/monthly');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(tObj.getHolidayReq2);

    });

  }
  );
})
