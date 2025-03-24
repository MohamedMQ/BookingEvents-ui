import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
      path: '',
      redirectTo: '/events',
      pathMatch: 'full'
    },
    {
      path: 'events',
      loadComponent: () => import('./pages/event-list/event-list.component').then(m => m.EventListComponent),
      // canMatch: [authGuard]
    },
    {
      path: 'events/create',
      loadComponent: () => import('./pages/create-event/create-event.component').then(m => m.CreateEventComponent),
      canMatch: [authGuard]
    },
    {
      path: 'events/update/:eventId',
      loadComponent: () => import('./pages/update-event/update-event.component').then(m => m.UpdateEventComponent),
      canMatch: [authGuard]
    },
    {
      path: 'events/my-events',
      loadComponent: () => import('./pages/my-events/my-events.component').then(m => m.MyEventsComponent),
      canMatch: [authGuard]
    },
    {
      path: 'events/:eventId/payment',
      loadComponent: () => import('./pages/payment/payment.component').then(m => m.PaymentComponent),
      canMatch: [authGuard]
    },
    {
      path: 'events/:eventId',
      loadComponent: () => import('./pages/single-event/single-event.component').then(m => m.SingleEventComponent),
      // canMatch: [authGuard]
    },
    {
      path: 'dashboard',
      loadComponent: () => import('./pages/seller-dashboard/seller-dashboard.component').then(m => m.SellerDashboardComponent),
      canMatch: [authGuard]
    },
    {
      path: '**',
      loadComponent: () => import('./pages/error/error.component').then(m => m.ErrorComponent),
    },
];
