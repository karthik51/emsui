import { Component, OnInit } from '@angular/core';
import { ADMIN_ROUTES, USER_ROUTES } from './menu-items';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  public sidebarnavItems: any[];

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    if (this.authService.isAdminRole) {
      this.sidebarnavItems = ADMIN_ROUTES.filter(sidebarnavItem => sidebarnavItem);
    } else if (this.authService.isUserRole) {
      this.sidebarnavItems = USER_ROUTES.filter(sidebarnavItem => sidebarnavItem);
    } 
  }
}
