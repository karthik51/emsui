import { Observable, of } from 'rxjs';
import { ActivatedRouteSnapshot, Router, Resolve } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { BadRequestError } from '../_shared/error-handlers/bad-request-error';
import { UnauthorizedError } from '../_shared/error-handlers/unauthorized-error';
import { ROUTE_PATH } from '../_constants/route-name.constant';
import { EventDetailModel } from '../_models/event-detail.model';
import { AdminService } from './../_services/admin.service';

@Injectable({
    providedIn: 'root'
})
export class ViewAllEventResolver implements Resolve<EventDetailModel[]> {
    constructor(
        private adminService: AdminService,
        private router: Router,
        private alertify: AlertifyService
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<EventDetailModel[]> {
        return this.adminService.getAllEvents()
            .pipe(catchError((error: Response) => {
                if (error instanceof BadRequestError) {
                    this.alertify.error(error.originalError);
                    this.router.navigate([ROUTE_PATH.ERROR, error.status]);
                } else if (error instanceof UnauthorizedError) {
                    this.router.navigate([ROUTE_PATH.ERROR, error.status]);
                } else {
                    this.router.navigate([ROUTE_PATH.ERROR, '500']);
                }

                return of(null);
            }));
    }
}
