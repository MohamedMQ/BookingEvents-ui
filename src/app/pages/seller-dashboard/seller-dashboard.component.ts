import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faPlus, faCalendarDays, faCircle, faCircleCheck, faGauge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
}
