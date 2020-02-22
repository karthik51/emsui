// Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppJwtAuthModule } from './_modules/app-jwt-auth-module';
import { AppBootstrapModule } from './_modules/app-bootstrap.module';
import { AppProgressBarModule } from './_modules/app-progress-bar.module';
import { ToastrModule } from 'ng6-toastr-notifications';
import { DataTablesModule } from 'angular-datatables';

// Providers
import { ErrorInterceptorProvider } from './_shared/error.interceptor';

// Handlers
import { AppErrorHandler } from './_shared/error-handlers/app-error-handler';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './_components/auth/login/login.component';
import { ErrorComponent } from './_shared/components/error/error.component';
import { NavComponent } from './_shared/components/nav/nav.component';
import { NavigationComponent } from './_shared/components/header-navigation/navigation.component';
import { SidebarComponent } from './_shared/components/sidebar/sidebar.component';
import { HomeComponent } from './_components/home/home.component';
import { CreateEventComponent } from './_components/admin/create-event/create-event.component';
import { ViewAllEventsComponent } from './_components/admin/view-all-events/view-all-events.component';
import { ViewUserEventsComponent } from './_components/user/view-user-events/view-user-events.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    NavComponent,
    NavigationComponent,
    SidebarComponent,
    HomeComponent,    
    CreateEventComponent,    
    ViewAllEventsComponent,
    ViewUserEventsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppBootstrapModule,
    AppJwtAuthModule,
    AppProgressBarModule,
    ToastrModule.forRoot(),
    DataTablesModule
  ],
  providers: [
    ErrorInterceptorProvider,
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
