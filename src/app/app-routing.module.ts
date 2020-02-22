import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROUTE_PATH } from './_constants/route-name.constant';
import { LoginComponent } from './_components/auth/login/login.component';
import { ErrorComponent } from './_shared/components/error/error.component';
import { HomeComponent } from './_components/home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { ViewUserEventsComponent } from './_components/user/view-user-events/view-user-events.component';
import { CreateEventComponent } from './_components/admin/create-event/create-event.component';
import { ViewAllEventsComponent } from './_components/admin/view-all-events/view-all-events.component';
import { ViewAllEventResolver } from './_resolvers/view-all-events.resolver';
import { ViewUserEventResolver } from './_resolvers/view-user-events.resolver';


const routes: Routes = [
  { path: ROUTE_PATH.LOGIN, component: LoginComponent },
  { path: ROUTE_PATH.ERROR + '/:id', component: ErrorComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: ROUTE_PATH.HOME,
        component: HomeComponent
      },
      {
        path: ROUTE_PATH.ADMIN.CREATE_EVENT,
        component: CreateEventComponent
      },
      {
        path: ROUTE_PATH.ADMIN.MAIN,
        children: [
          {
            path: ROUTE_PATH.ADMIN.VIEW_ALL_EVENTS,
            component: ViewAllEventsComponent,
            resolve: {
              eventDetails: ViewAllEventResolver
            }
          }
        ]
      },
      {
        path: ROUTE_PATH.USER.MAIN,
        children: [
          {
            path: ROUTE_PATH.USER.VIEW_USER_EVENTS,
            component: ViewUserEventsComponent,
            resolve: {
              viewUserEventResolver: ViewUserEventResolver
            }
          }
        ]
      }     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
