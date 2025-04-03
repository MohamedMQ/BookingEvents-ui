import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { eventGuard } from './core/guards/event.guard';
import { publicAuthGuard } from './core/guards/public-auth.guard';
import { ticketGuard } from './core/guards/ticket.guard';
import { accountStatusGuard } from './core/guards/account-status.guard';

export const routes: Routes = [
    {
      path: '',
      redirectTo: '/events',
      pathMatch: 'full'
    },
    {
      path: 'events',
      loadComponent: () => import('./pages/event-list/event-list.component').then(m => m.EventListComponent),
      canMatch: [publicAuthGuard]
    },
    {
      path: 'events/create',
      loadComponent: () => import('./pages/create-event/create-event.component').then(m => m.CreateEventComponent),
      canMatch: [authGuard, accountStatusGuard]
    },
    {
      path: 'events/my-events',
      loadComponent: () => import('./pages/my-events/my-events.component').then(m => m.MyEventsComponent),
      canMatch: [authGuard]
    },
    {
      path: 'events/update/:eventId',
      loadComponent: () => import('./pages/update-event/update-event.component').then(m => m.UpdateEventComponent),
      canMatch: [authGuard, eventGuard]
    },
    {
      path: 'events/:eventId',
      loadComponent: () => import('./pages/single-event/single-event.component').then(m => m.SingleEventComponent),
      canMatch: [publicAuthGuard, eventGuard]
    },
    {
      path: 'events/:eventId/payment',
      loadComponent: () => import('./pages/payment/payment.component').then(m => m.PaymentComponent),
      canMatch: [authGuard]
    },
    {
      path: 'tickets/my-tickets',
      loadComponent: () => import('./pages/my-tickets/my-tickets.component').then(m => m.MyTicketsComponent),
      canMatch: [authGuard]
    },
    {
      path: 'tickets/:ticketId',
      loadComponent: () => import('./pages/single-ticket/single-ticket.component').then(m => m.SingleTicketComponent),
      canMatch: [authGuard, ticketGuard]
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
