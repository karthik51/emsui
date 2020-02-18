import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { EventDetailModel } from 'src/app/_models/event-detail.model';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/_services/admin.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-all-events',
  templateUrl: './view-all-events.component.html',
  styleUrls: ['./view-all-events.component.css']
})
export class ViewAllEventsComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  eventDetails: EventDetailModel[];

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
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
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
