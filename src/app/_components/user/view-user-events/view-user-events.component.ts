import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { EventDetailModel, RegisterUser } from 'src/app/_models/event-detail.model';
import {RegisterEventModel} from 'src/app/_models/register-event.model'
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from './../../../_services/alertify.service';
import { BadRequestError } from 'src/app/_shared/error-handlers/bad-request-error';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-user-events',
  templateUrl: './view-user-events.component.html',
  styleUrls: ['./view-user-events.component.css']
})
export class ViewUserEventsComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtRegisterOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  dtRegisterTrigger: Subject<any> = new Subject();
  eventDetails: EventDetailModel[]; 
  registerEvents: EventDetailModel[];  
  registerEventModel: RegisterEventModel = {id:undefined, userId: undefined, userName: undefined};

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private alertify: AlertifyService   
  ) { }
   
  ngOnInit() {
    this.adminService.getAllEvents().subscribe(resolve => {
      console.log("componment admin");
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10
      };
      
      this.eventDetails = resolve;
      setTimeout(() => {
        this.dtTrigger.next();
      });
    });

    this.adminService.getUserEvents(sessionStorage.getItem('name')).subscribe(resolve => {
      console.log("getAllEvents");
      this.dtRegisterOptions = {
        pagingType: 'full_numbers',
        pageLength: 10
      };
      
      this.registerEvents = resolve;
      setTimeout(() => {
        this.dtRegisterTrigger.next();
      });
    });
  }

  registerEvent(eventDetail : EventDetailModel)
  {    
    this.registerEventModel.id = eventDetail.id;
    this.registerEventModel.userId = sessionStorage.getItem('id');
    this.registerEventModel.userName = sessionStorage.getItem('name');
    this.adminService.registerEvent(this.registerEventModel)
    .subscribe(response => {
      if (response) {
        this.alertify.success('Event register successfully!');        
      }
    }, error => {
      if (error instanceof BadRequestError) {
        this.alertify.error(error.originalError);
      }
    });   
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
