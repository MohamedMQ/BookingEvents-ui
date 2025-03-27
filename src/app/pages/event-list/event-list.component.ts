import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  faLocationDot,
  faCalendarDays,
  faTicket,
  faStar,
  faPencil,
  faArrowRightLong,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { EventService } from '../../core/services/event.service';
import { Store } from '@ngrx/store';
import { selectUserFeature } from '../../store/selectors/user.selector';
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { AuthService } from '../../core/services/auth.service';
import { userAction } from '../../store/actions/user.action';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-event-list',
  imports: [
    FontAwesomeModule,
    CommonModule,
    NgxPaginationModule,
    RouterModule
  ],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css',
})
export class EventListComponent implements OnInit {
  faLocationDot = faLocationDot;
  faCalendarDays = faCalendarDays;
  faTicket = faTicket;
  faStar = faStar;
  faPencil = faPencil;
  faArrowRightLong = faArrowRightLong;
  faCircleXmark = faCircleXmark;

  data: any = []
  isLoading: boolean = true;
  imageUrl: string = environment.imageBaseUrl;
  page: number = 1;
  itemsPerPage: number = 10;
  totalItems = 0;

  private eventService = inject(EventService);
  private authService = inject(AuthService);
  private store = inject(Store);

  user$ = this.store.select(selectUserFeature);

  loadEvents(pageNum: number, firstLoad: boolean) {
    this.user$.subscribe((user) => {
      if (!user.id)
        this.eventService
          .publicEvents(pageNum - 1)
          .pipe(
            finalize(() => {
              this.isLoading = false;
            })
          ).subscribe({
            next: (response) => {
              console.log(response, user);
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
      else
        this.eventService
          .protectedEvents(pageNum - 1)
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
    })
  }

  ngOnInit(): void {
    this.loadEvents(this.page, true);
  }

  loadMoreEvents(newPage: number) {
    this.loadEvents(newPage, false);
  }
}
