import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from './../../../_services/alertify.service';
import { EventDetailModel } from 'src/app/_models/event-detail.model';
import { BadRequestError } from 'src/app/_shared/error-handlers/bad-request-error';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  eventForm: FormGroup;  
  eventDetail: EventDetailModel;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private adminService: AdminService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(resolve => {
      this.eventDetail = resolve.eventDetail;
     
    });
    this.eventForm = this.buildForm();
  }

  get EventForm() {
    return this.eventForm.controls;
  }

  buildForm(): FormGroup {
    var currentUser = [{'userId' : sessionStorage.getItem('id'),'userName' : sessionStorage.getItem('name')}]; 
    
    return this.fb.group({
      eventTitle: [null, Validators.required],
      eventDescription: [null, Validators.required],
      eventDate: [null, Validators.required], 
      eventStartTime: [null, Validators.required],
      eventEndTime: [null, Validators.required],
      eventLocation: [null, Validators.required],
      isTransportation: [false, Validators.required],
      poc: [null, Validators.required],
      registerUser: [currentUser]
    });
  }

  createEvent(): void {    
      this.adminService.createEvent(this.eventForm.value)
        .subscribe(response => {
          if (response) {
            this.alertify.success('Event created successfully!');
            this.clearForm();
          }
        }, error => {
          if (error instanceof BadRequestError) {
            this.alertify.error(error.originalError);
          }
        });   
  }

  clearForm(): void {
    this.eventForm.reset();    
  }  
}