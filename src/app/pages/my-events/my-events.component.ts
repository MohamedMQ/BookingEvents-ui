import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faArrowLeft, faPlus, faPenToSquare, faBan, faTicket, faMoneyBill1, faCalendarDays, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { NgxPaginationModule } from 'ngx-pagination'
import { finalize } from 'rxjs';
import { EventService } from '../../core/services/event.service';
import { environment } from '../../../environments/environment.development';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-events',
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgxPaginationModule,
    RouterModule
  ],
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.css'
})
export class MyEventsComponent {
  faArrowLeft = faArrowLeft;
  faPlus = faPlus;
  faPenToSquare = faPenToSquare;
  faBan = faBan;
  faTicket = faTicket;
  faMoneyBill1 = faMoneyBill1;
  faCalendarDays = faCalendarDays;
  faCircleInfo = faCircleInfo;

  data: any = []
  isLoading: boolean = true;
  imageUrl: string = environment.imageBaseUrl;
  page: number = 1;
  itemsPerPage: number = 10;
  totalItems = 0;
  LoadingCanceling: boolean = false;

  private eventService = inject(EventService);
  private router = inject(Router);
  private location = inject(Location);
  private toastrService = inject(ToastrService);

  loadEvents(pageNum: number, firstLoad: boolean) {
    this.eventService
      .protectedEventsOwn(pageNum - 1)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe({
        next: (response) => {
          console.log(response);
          firstLoad ?
            this.page = response.pagination.currentPage :
            this.page = response.pagination.currentPage + 1;
          this.itemsPerPage = response.pagination.pageSize;
          this.totalItems = response.pagination.totalElements;
          this.data = response.data;
        },
        error: (err) => {
          this.toastrService.error(err.error.message, 'Error');
        }
      })
  }

  ngOnInit(): void {
    this.loadEvents(this.page, true);
  }

  loadMoreEvents(newPage: number) {
    this.loadEvents(newPage, false);
  }

  isBefore(item: any): boolean {
    if (new Date(item.eventDateTime) < new Date())
      return true
    return false
  }

  goToCreateEvent(): void {
    this.router.navigate(['/events/create']);
  }

  goToUpdateEvent(eventId: number): void {
    this.router.navigate([`/events/update/${eventId}`]);
  }

  goBack(): void {
    this.location.back();
  }

  cancelEvent(item: any) {
    this.LoadingCanceling = true;
    this.eventService
      .deleteProtectedEvent(item.id)
      .subscribe({
        next: (res) => {
          item.eventStatus = res.data.eventStatus;
          this.LoadingCanceling = true;
          this.toastrService.success(res.message, 'Success');
        },
        error: (err) => {
          this.LoadingCanceling = true;
          this.toastrService.error(err.error.message, 'Error');
        }
      })
  }
}

// deleteProtectedEvent
