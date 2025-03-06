import { Routes } from '@angular/router';
import { EventListComponent } from './features/event-list/event-list.component';
import { SingleEventComponent } from './features/single-event/single-event.component';

export const routes: Routes = [
    { path: '', redirectTo: '/events', pathMatch: 'full' },
    { path: 'events', component: EventListComponent },
    { path: 'events/:eventId', component: SingleEventComponent },
];
