import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRightLong, faCalendarDays, faLocationDot, faTicket } from '@fortawesome/free-solid-svg-icons';
import { NgxPaginationModule } from 'ngx-pagination';
import { selectUserFeature } from '../../store/selectors/user.selector';
import { Store } from '@ngrx/store';
import { TicketService } from '../../core/services/ticket.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-my-tickets',
  imports: [
    FontAwesomeModule,
    CommonModule,
    NgxPaginationModule,
    RouterModule
  ],
  templateUrl: './my-tickets.component.html',
  styleUrl: './my-tickets.component.css',
})
export class MyTicketsComponent {
  faLocationDot = faLocationDot;
  faCalendarDays = faCalendarDays;
  faTicket = faTicket;
  faArrowRightLong = faArrowRightLong;

  data: any = [];
  isLoading: boolean = true;
  page: number = 1;
  itemsPerPage: number = 10;
  totalItems = 0;

  private store = inject(Store);
  private ticketService = inject(TicketService);

  user$ = this.store.select(selectUserFeature);

  loadEvents(pageNum: number, firstLoad: boolean) {
    this.ticketService
      .protectedTickets(pageNum - 1)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (response) => {
          // console.log(response);
          firstLoad
            ? (this.page = response.pagination.currentPage)
            : (this.page = response.pagination.currentPage + 1);
          this.itemsPerPage = response.pagination.pageSize;
          this.totalItems = response.pagination.totalElements;
          this.data = response.data;
        },
        error: (err) => {
          // console.log(err);
        },
      });
  }

  ngOnInit(): void {
    this.loadEvents(this.page, true);
  }

  loadMoreEvents(newPage: number) {
    this.loadEvents(newPage, false);
  }

  isBefore(item: any): boolean {
    // console.log(new Date(item.eventDateTime) < new Date());
    if (new Date(item.eventDateTime) < new Date()) return true;
    return false;
  }
}
