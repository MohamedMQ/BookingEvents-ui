import { Component, inject } from '@angular/core';
import { faArrowLeft, faArrowLeftLong, faArrowRightLong, faCalendarDays, faCircleNotch, faCircleXmark, faDownload, faIdCard, faLocationDot, faShareNodes, faSpinner, faTicket, faUser, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../environments/environment.development';
import { EventService } from '../../core/services/event.service';
import { TicketService } from '../../core/services/ticket.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-single-ticket',
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    RouterModule
  ],
  templateUrl: './single-ticket.component.html',
  styleUrl: './single-ticket.component.css'
})
export class SingleTicketComponent {
  faLocationDot = faLocationDot;
  faCalendarDays = faCalendarDays;
  faTicket = faTicket;
  faUserGroup = faUserGroup;
  faArrowLeftLong = faArrowLeftLong;
  faCircleXmark = faCircleXmark;
  faSpinner = faSpinner;
  faCircleNotch = faCircleNotch;
  faUser = faUser;
  faIdCard = faIdCard;
  faDownload = faDownload;
  faShareNodes = faShareNodes;
  faArrowLeft = faArrowLeft;

  private ticketId: number = 0;
  data: any = [];
  isLoading: boolean = true;
  isPosting: boolean = false;
  isCanceling: boolean = true;
  queuePos: number = -1;
  imageUrl = environment.imageBaseUrl;
  processingPayment = false;

  private ticketService = inject(TicketService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  fetchTicket() {
    this.route
      .paramMap
      .subscribe(params => {
        let paramStr: string | null = params.get('ticketId');
        this.ticketId = Number(paramStr);
        this.ticketService
        .protectedTicketGet(this.ticketId)
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
            // console.log(err);
            this.router.navigate(['/errorPage']);
          }
        })
      })
  }

  ngOnInit(): void {
    this.fetchTicket();
  }

  isBefore(item: any): boolean {
    // console.log(new Date(item.eventDateTime) < new Date());
    if (new Date(item.eventDateTime) < new Date())
      return true
    return false
  }
}
