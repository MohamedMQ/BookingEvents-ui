import { ToastrService } from 'ngx-toastr';
import {
  Component,
  inject
} from '@angular/core';
import {
  faArrowLeft,
  faArrowLeftLong,
  faCalendarDays,
  faCaretUp,
  faCircleNotch,
  faCircleXmark,
  faDownload,
  faIdCard,
  faLocationDot,
  faShareNodes,
  faSpinner,
  faTicket,
  faUser,
  faUserGroup
} from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../environments/environment.development';
import { TicketService } from '../../core/services/ticket.service';
import {
  ActivatedRoute,
  Router,
  RouterModule
} from '@angular/router';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClient } from '@angular/common/http';
import {
  FileSaverModule,
  FileSaverService
} from 'ngx-filesaver';
import { ShareButtons } from 'ngx-sharebuttons/buttons'

// import { ShareIconsModule } from 'ngx-sharebuttons/icons'

@Component({
  selector: 'app-single-ticket',
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    RouterModule,
    FileSaverModule,
    ShareButtons
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
  faCaretUp = faCaretUp;

  private ticketId: number = 0;
  data: any = [];
  isLoading: boolean = true;
  isPosting: boolean = false;
  isCanceling: boolean = true;
  queuePos: number = -1;
  imageUrl = environment.imageBaseUrl;
  downloadingOrSharing: boolean = false;
  shareOpened: boolean = false;

  private ticketService = inject(TicketService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastrService = inject(ToastrService);

  private http = inject(HttpClient);
  private filesaverService = inject(FileSaverService);

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
            this.toastrService.error(err.error.message, 'Error');
            this.router.navigate(['/events']);
          }
        })
      })
  }

  ngOnInit(): void {
    this.fetchTicket();
  }

  isBefore(item: any): boolean {
    if (new Date(item.eventDateTime) < new Date())
      return true
    return false
  }

  downloadTicketPdf(): void {
    this.downloadingOrSharing = true
    this.http.get(`http://localhost:8080/api/protected/tickets/${this.data.tickets[0].id}/download/pdf`, {
      responseType: 'blob'
    }).pipe(
      finalize(() => {
        this.downloadingOrSharing = false
      })
    ).subscribe({
      next: (blob) => {
        this.filesaverService.save(blob, 'ticket.pdf');
      },
      error: () => {
        this.toastrService.error("Something went wrong, try again !!", "Error");
      }
    })
  }

  sharedStatus(): void {
    this.shareOpened = !this.shareOpened;
  }

  getShareUrl(data: any): string {
    return `http://localhost:3000/events/${data.id}`;
  }
}
