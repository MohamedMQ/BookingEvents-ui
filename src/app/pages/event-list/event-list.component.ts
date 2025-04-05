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
  faCircleNotch,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { EventService } from '../../core/services/event.service';
import { Store } from '@ngrx/store';
import { selectUserFeature } from '../../store/selectors/user.selector';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { finalize, first, startWith } from 'rxjs';
import { selectSearchFeature } from '../../store/selectors/search.selector';
import { ToastrService } from 'ngx-toastr';

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
  faCircleNotch = faCircleNotch;
  faMagnifyingGlass = faMagnifyingGlass;

  data: any = []
  isLoading: boolean = true;
  imageUrl: string = environment.imageBaseUrl;
  page: number = 1;
  itemsPerPage: number = 10;
  totalItems = 0;
  searchTerm: string = '';
  firstLoad: boolean = true;

  private eventService = inject(EventService);
  private store = inject(Store);
  private router = inject(Router);
  private toastrService = inject(ToastrService);

  user$ = this.store.select(selectUserFeature);
  search$ = this.store.select(selectSearchFeature);

  loadEvents(pageNum: number, firstLoad: boolean) {
    this.user$.subscribe((user) => {
        if (!user.id) {
          this.eventService
            .publicEvents(pageNum - 1, this.searchTerm)
            .pipe(
              finalize(() => {
                this.isLoading = false;
              })
            ).subscribe({
              next: (response) => {
                firstLoad ?
                  this.page = response.pagination.currentPage :
                  this.page = response.pagination.currentPage + 1;
                this.itemsPerPage = response.pagination.pageSize;
                this.totalItems = response.pagination.totalElements;
                this.data = response.data;
              },
              error: (err) => {
                this.toastrService.error(err.error.message);
              }
            })
        }
        else
          this.eventService
            .protectedEvents(pageNum - 1, this.searchTerm)
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
                this.toastrService.error(err.error.message);
              }
            })
      })
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.search$.subscribe((search) => {
      if (this.firstLoad)
        this.searchTerm = search.searchTerm;
      if (this.searchTerm !== search.searchTerm)
        this.router.navigateByUrl('/refresh', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/']);
    });
  })
  if (this.firstLoad) {
      this.firstLoad = false;
      this.loadEvents(this.page, true);
    }
  }

  loadMoreEvents(newPage: number) {
    this.loadEvents(newPage, false);
  }

  isBefore(item: any): boolean {
    if (new Date(item.eventDateTime) < new Date())
      return true
    return false
  }
}
