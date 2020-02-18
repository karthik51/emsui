import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EventDetailModel } from '../_models/event-detail.model';
import { RegisterEventModel } from '../_models/register-event.model';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private eventRoute: string = environment.baseApiUrl + '/events/';

    constructor(private http: HttpClient) {
    }

    getAllEvents(): Observable<EventDetailModel[]> {
        const token = sessionStorage.getItem('token');       
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
        const httpOptions = { 'headers': headers_object};
      
        var response = this.http.get<EventDetailModel[]>(this.eventRoute +'GetAllEvents', httpOptions);
        console.log('getAllEvents');
        return response;
    }

    getUserEvents(user: string): Observable<EventDetailModel[]> {
        const token = sessionStorage.getItem('token');       
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
        const httpOptions = { 'headers': headers_object};       
        var response = this.http.get<EventDetailModel[]>(this.eventRoute +'GetEventsByVolunteer?name='+ user, httpOptions);
        console.log('getUserEvents');
        return response;
    }

    createEvent(event: any): Observable<boolean> {
        return this.http.post<boolean>(this.eventRoute + 'CreateEvent', event);
    }

    registerEvent(event: RegisterEventModel): Observable<boolean> {

        return this.http.put<boolean>(this.eventRoute + 'UpdateEvent?Id='+event.id+'&UserId='+ event.userId+'&UserName='+event.userName, event);
    }
}
