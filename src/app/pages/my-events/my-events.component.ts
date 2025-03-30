import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faArrowLeft, faPlus, faPenToSquare, faBan, faTicket, faMoneyBill1, faCalendarDays, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { NgxPaginationModule } from 'ngx-pagination'
import { finalize } from 'rxjs';
import { EventService } from '../../core/services/event.service';
import { environment } from '../../../environments/environment.development';
import { Router, RouterModule } from '@angular/router';

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

  private eventService = inject(EventService);
  private router = inject(Router);
  private location = inject(Location);

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
          console.log(err);
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
    console.log(new Date(item.eventDateTime) < new Date());
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
}
