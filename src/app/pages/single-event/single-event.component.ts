import { Event } from './../../../../node_modules/@parcel/watcher/index.d';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { faLocationDot, faCalendarDays, faTicket, faUserGroup, faArrowRightLong, faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { EventService } from '../../core/services/event.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { selectUserFeature } from '../../store/selectors/user.selector';
import { finalize } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AuthService } from '../../core/services/auth.service';
import { userAction } from '../../store/actions/user.action';
// import { NgxPaginationModule } from 'ngx-pagination'

@Component({
  selector: 'app-single-event',
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  templateUrl: './single-event.component.html',
  styleUrl: './single-event.component.css'
})
export class SingleEventComponent implements OnInit {

  faLocationDot = faLocationDot;
  faCalendarDays = faCalendarDays;
  faTicket = faTicket;
  faUserGroup = faUserGroup;
  faArrowRightLong = faArrowRightLong;
  faCircleXmark = faCircleXmark;
  faSpinner = faSpinner

  private eventId: number = 0;
  data: any = [];
  isLoading: boolean = true;
  imageUrl = environment.imageBaseUrl;

  private eventService = inject(EventService);
  private authService = inject(AuthService);
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private router = inject(Router);


  user$ = this.store.select(selectUserFeature);

  fetchEvent() {
    this.route
      .paramMap
      .subscribe(params => {
        let paramStr: string | any = params.get('eventId');
        this.eventId = (!isNaN(Number(paramStr)) && Number(paramStr) > 0) ? Number(paramStr) : 0;
        if (!this.eventId)
          this.router.navigate(['/errorPage']);
        this.eventService
        .publicEvent(this.eventId)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe({
          next: (res) => {
            console.log(res)
            this.data = res.data;
          },
          error: (err) => {
            console.log(err);
          }
        })
      })
  }

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      if (!user.id)
        this.authService
          .protectedProfile()
          .pipe(
            finalize(() => {
              this.fetchEvent();
            })
          )
          .subscribe({
            next: (res) => {
              let { id, name, email } = res.data;
              const user = { id, name, email }
              this.store.dispatch(userAction({ user }));
            },
            error: (err) => {
              console.log(err);
            }
          })
      else
          this.fetchEvent();
    })
  }

  updateEvent() {
    this.router.navigate([`/events/update/${this.data.id}`]);
  }
}
