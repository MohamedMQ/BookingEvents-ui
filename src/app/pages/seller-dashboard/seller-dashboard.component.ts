import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faPlus, faCalendarDays, faCircle, faCircleCheck, faGauge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-dashboard',
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.css'
})
export class SellerDashboardComponent {
  faPlus = faPlus;
  faCalendarDays = faCalendarDays;
  faCircle = faCircle;
  faCircleCheck = faCircleCheck;
  faGauge = faGauge;

  private router = inject(Router);

  goToCreateEvent(): void {
    this.router.navigate(['/events/create']);
  }

  goToMyEvents(): void {
    this.router.navigate(['/events/my-events']);
  }
}
