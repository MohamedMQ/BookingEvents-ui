import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { DashboardModule } from './dashboard/dashboard.module'
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  imports: [
    // RouterOutlet,
    // DashboardModule,
    DashboardComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BookingEvents-ui';
}
