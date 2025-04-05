import { ToastrService } from 'ngx-toastr';
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
  private stripeSharedKey = environment.stripeSharedKey;

  private eventService = inject(EventService);
  private ticketService = inject(TicketService);
  private paymentService = inject(PaymentService);
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastrService = inject(ToastrService);

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
              this.data = res.data;
            },
            error: (err) => {
              this.toastrService.error(err.error.message, 'Error');
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
                this.data = res.data;
              },
              error: (err) => {
                this.toastrService.error(err.error.message, 'Error');
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
          if (res.message === "Ticket added successfully.")
            this.data.tickets.push(res.data);
          else {
            this.data.tickets[0] = res.data;
          }
          this.toastrService.success(res.message, 'Success');
        },
        error: (err) => {
          this.toastrService.error(err.error.message, 'Error');
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
          this.data.tickets = [];
          this.toastrService.success(res.message, 'Success');
        },
        error: (err) => {
          this.toastrService.error(err.error.message, 'Error');
        }
      })
  }

  isBefore(item: any): boolean {
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
          this.toastrService.error(err.error.message, 'Error');
        }
      })
  }

  private async redirectToCheckout(sessionId: string) {
    try {
      const stripe = await loadStripe(this.stripeSharedKey);
      if (!stripe) {
        this.processingPayment = false;
        this.toastrService.error("Stripe.js failed to load.", 'Error');
        throw new Error("Stripe.js failed to load.");
      }
      const { error } = await stripe.redirectToCheckout({ sessionId: sessionId });
      if (error) {
        this.processingPayment = false;
        this.toastrService.error("Error redirecting to checkout", 'Error');
      }
    } catch (error) {
      console.error('Error initializing Stripe Checkout:', error);
      this.toastrService.error("Error initializing Stripe Checkout", 'Error');
    } finally {
      this.processingPayment = false;
    }
  }
}
