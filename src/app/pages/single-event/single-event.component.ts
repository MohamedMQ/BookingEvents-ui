import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit
} from '@angular/core';
import {
  faLocationDot,
  faCalendarDays,
  faTicket,
  faUserGroup,
  faArrowRightLong,
  faCircleXmark,
  faSpinner,
  faCircleNotch,
  faUser,
  faIdCard
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { EventService } from '../../core/services/event.service';
import { Store } from '@ngrx/store';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { selectUserFeature } from '../../store/selectors/user.selector';
import { finalize } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { TicketService } from '../../core/services/ticket.service';
import { PaymentService } from '../../core/services/payment.service';
import { loadStripe } from '@stripe/stripe-js';
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
  faCircleNotch = faCircleNotch;
  faUser = faUser;
  faIdCard = faIdCard;

  private eventId: number = 0;
  data: any = [];
  isLoading: boolean = true;
  isPosting: boolean = false;
  isCanceling: boolean = true;
  queuePos: number = -1;
  imageUrl = environment.imageBaseUrl;
  processingPayment = false;

  private eventService = inject(EventService);
  private ticketService = inject(TicketService);
  private paymentService = inject(PaymentService);
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  user$ = this.store.select(selectUserFeature);

  fetchEvent(isUserExists: boolean) {
    this.route
      .paramMap
      .subscribe(params => {
        let paramStr: string | null = params.get('eventId');
        this.eventId = Number(paramStr);
        if (isUserExists)
          this.eventService
          .protectedEvent(this.eventId)
          .pipe(
            finalize(() => {
              this.isLoading = false;
            })
          )
          .subscribe({
            next: (res) => {
              // console.log(res)
              this.data = res.data;
            },
            error: (err) => {
              // console.log(err);
              this.router.navigate(['/errorPage']);
            }
          })
        else
          this.eventService
            .publicEvent(this.eventId)
            .pipe(
              finalize(() => {
                this.isLoading = false;
              })
            )
            .subscribe({
              next: (res) => {
                // console.log(res)
                this.data = res.data;
              },
              error: (err) => {
                // console.log(err);
                this.router.navigate(['/errorPage']);
              }
          })
      })
  }

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      if (!user.id)
        this.fetchEvent(false);
      else
        this.fetchEvent(true);
    })
  }

  updateEvent() {
    this.router.navigate([`/events/update/${this.data.id}`]);
  }

  bookNewTicket() {
    const dataToSend = { eventId: this.data.id };
    this.isPosting = true;
    this.ticketService
      .protectedTicket(dataToSend)
      .pipe(
        finalize(() => {
          this.isPosting = false;
        })
      )
      .subscribe({
        next: (res) => {
          // console.log(res);
          if (res.message === "Ticket added successfully.")
            this.data.tickets.push(res.data);
          else {
            this.data.tickets[0] = res.data;
          }
        },
        error: (err) => {
          // console.log("ERROR HAPPENED : ", err);
        }
      })
  }

  cancelTicket() {
    const ticketId = this.data.tickets[0].id;
    this.isCanceling = true;
    this.ticketService
      .protectedTicket(ticketId)
      .pipe(
        finalize(() => {
          this.isCanceling = false;
        })
      )
      .subscribe({
        next: (res) => {
          // console.log("RESULT IS : ", res);
          this.data.tickets = [];
        },
        error: (err) => {
          // console.log(err);
        }
      })
  }

  isBefore(item: any): boolean {
    // console.log(new Date(item.eventDateTime) < new Date());
    if (new Date(item.eventDateTime) < new Date())
      return true
    return false
  }

  processPayment() {
    this.processingPayment = true;
    this.paymentService
      .initializePayment(this.data.tickets[0].id)
      .subscribe({
        next: (res) => {
          this.redirectToCheckout(res.data.sessionId);
        },
        error: (err) => {
          this.processingPayment = false;
          console.error('Error creating checkout session:', err);
        }
      })
  }

  private async redirectToCheckout(sessionId: string) {
    try {
      const stripe = await loadStripe('pk_test_51R9Ptr4DbCH6QsC3nGqcCIvs3U1weOBdsEZWPyb3YDTP495mGsZDwR4X4y7FUSZ7416laUN8uQHQirusj4WzOqcL00ArQJh94x');
      if (!stripe) {
        this.processingPayment = false;
        throw new Error("Stripe.js failed to load.");
      }
      const { error } = await stripe.redirectToCheckout({ sessionId: sessionId });
      if (error) {
        this.processingPayment = false;
        console.error('Error redirecting to checkout:', error);
      }
    } catch (error) {
      console.error('Error initializing Stripe Checkout:', error);
    } finally {
      this.processingPayment = false;
    }
  }
}
