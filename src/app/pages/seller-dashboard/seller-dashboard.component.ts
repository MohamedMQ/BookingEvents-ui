import { ToastrService } from 'ngx-toastr';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faPlus, faCalendarDays, faCircle, faCircleCheck, faGauge, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-seller-dashboard',
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule
  ],
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.css'
})
export class SellerDashboardComponent implements OnInit {
  faPlus = faPlus;
  faCalendarDays = faCalendarDays;
  faCircle = faCircle;
  faCircleCheck = faCircleCheck;
  faGauge = faGauge;
  faSpinner = faSpinner;

  data: any;
  isLoading: boolean = true;
  loadingAccountLink: boolean = false;

  private router = inject(Router);
  private authService = inject(AuthService);
  private toastrService = inject(ToastrService);

  ngOnInit(): void {
    this.authService
      .accountStatus()
      .subscribe({
        next: (res) => {
          this.data = res.data;
          this.isLoading = false;
        },
        error: (err) => {
          this.toastrService.error(err.error.message, 'Error');
          this.router.navigate(['/events']);
        }
      })
  }

  goToCreateEvent(): void {
    this.router.navigate(['/events/create']);
  }

  goToMyEvents(): void {
    this.router.navigate(['/events/my-events']);
  }

  refreshStatus() {
    this.loadingAccountLink = true;
    this.authService
      .accountStatus()
      .subscribe({
        next: (res) => {
          this.data = res.data;
          this.loadingAccountLink = false;
        },
        error: (err) => {
          this.toastrService.error(err.error.message, 'Error');
          // this.router.navigate(['/error']);
        }
      })
  }

  goToSellerDashboard() {
    this.loadingAccountLink = true;
    this.authService
      .dashboardLink()
      .subscribe({
        next: (res) => {
          if (res.data.dashboardLink) {
            window.location.href = res.data.dashboardLink;
          }
        },
        error: (err) => {
          this.toastrService.error(err.error.message, 'Error');
          this.loadingAccountLink = false;
        }
      })
  }

  getAccountLink() {
    this.loadingAccountLink = true;
    this.authService
      .accountLink()
      .subscribe({
        next: (res) => {
          if (res.data.accountLink) {
            window.location.href = res.data.accountLink;
          }
        },
        error: (err) => {
          this.toastrService.error(err.error.message, 'Error');
          this.loadingAccountLink = false;
        }
      })
  }
}
