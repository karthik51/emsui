import { RouteInfo } from './sidebar.metadata';

export const ADMIN_ROUTES: RouteInfo[] = [
  {
    path: '/admin/view-all-events',
    title: 'View All Events',
    icon: 'mdi mdi-calendar-clock',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/create-event',
    title: 'Create Event',
    icon: 'mdi mdi-account-card-details',
    class: '',
    extralink: false,
    submenu: []
  },
];

export const USER_ROUTES: RouteInfo[] = [
  {
    path: '/user/view-user-events',
    title: 'View User Events',
    icon: 'mdi mdi-account-card-details',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/user/logout',
    title: 'Logout',
    icon: 'mdi mdi-check-circle',
    class: '',
    extralink: false,
    submenu: []
  }
];


