import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faArrowLeft, faPlus, faPenToSquare, faBan, faTicket, faMoneyBill1, faCalendarDays, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { NgxPaginationModule } from 'ngx-pagination'

@Component({
  selector: 'app-my-events',
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgxPaginationModule
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

  page: number = 1;
  itemsPerPage: number = 3;

  data = [
    {
      "id": 1,
      "name": "eminem",
      "description": "a ceremony of eminem birthday",
      "location": "CA. Los Angeles",
      "category": "hip hop",
      "eventDateTime": "2023-05-20T18:00:00",
      "price": 500.00,
      "totalTickets": 500,
      "availableTickets": 500,
      "imageUrl": "https://loremflickr.com/cache/resized/defaultImage.small_1000_600_nofilter.jpg",
      "user": {
          "id": 1,
          "name": "mmaqbour",
          "email": "mmaqbour@gmail.com",
          "createdAt": "2025-03-08T18:04:05.689+00:00",
          "updatedAt": "2025-03-08T18:04:05.689+00:00",
          "authorities": [],
          "username": "mmaqbour@gmail.com",
          "accountNonExpired": true,
          "accountNonLocked": true,
          "credentialsNonExpired": true,
          "enabled": true
      },
      "createdAt": "2025-03-08",
      "updatedAt": "2025-03-08"
    },
    {
      "id": 1,
      "name": "eminem",
      "description": "a ceremony of eminem birthday",
      "location": "CA. Los Angeles",
      "category": "hip hop",
      "eventDateTime": "2025-05-20T18:00:00",
      "price": 500.00,
      "totalTickets": 500,
      "availableTickets": 500,
      "imageUrl": "https://loremflickr.com/cache/resized/defaultImage.small_1000_600_nofilter.jpg",
      "user": {
          "id": 1,
          "name": "mmaqbour",
          "email": "mmaqbour@gmail.com",
          "createdAt": "2025-03-08T18:04:05.689+00:00",
          "updatedAt": "2025-03-08T18:04:05.689+00:00",
          "authorities": [],
          "username": "mmaqbour@gmail.com",
          "accountNonExpired": true,
          "accountNonLocked": true,
          "credentialsNonExpired": true,
          "enabled": true
      },
      "createdAt": "2025-03-08",
      "updatedAt": "2025-03-08"
    },
    {
      "id": 1,
      "name": "eminem",
      "description": "a ceremony of eminem birthday",
      "location": "CA. Los Angeles",
      "category": "hip hop",
      "eventDateTime": "2025-05-20T18:00:00",
      "price": 500.00,
      "totalTickets": 500,
      "availableTickets": 500,
      "imageUrl": "https://loremflickr.com/cache/resized/defaultImage.small_1000_600_nofilter.jpg",
      "user": {
          "id": 2,
          "name": "rennacir",
          "email": "rennacir@gmail.com",
          "createdAt": "2025-03-08T18:04:05.689+00:00",
          "updatedAt": "2025-03-08T18:04:05.689+00:00",
          "authorities": [],
          "username": "rennacir@gmail.com",
          "accountNonExpired": true,
          "accountNonLocked": true,
          "credentialsNonExpired": true,
          "enabled": true
      },
      "createdAt": "2025-03-08",
      "updatedAt": "2025-03-08"
    },
    {
      "id": 2,
      "name": "eminem",
      "description": "a ceremony of eminem birthday",
      "location": "CA. Los Angeles",
      "category": "hip hop",
      "eventDateTime": "2025-05-20T18:00:00",
      "price": 500.00,
      "totalTickets": 500,
      "availableTickets": 500,
      "imageUrl": "https://loremflickr.com/cache/resized/defaultImage.small_1000_600_nofilter.jpg",
      "user": {
          "id": 1,
          "name": "mmaqbour",
          "email": "mmaqbour@gmail.com",
          "createdAt": "2025-03-08T18:04:05.689+00:00",
          "updatedAt": "2025-03-08T18:04:05.689+00:00",
          "authorities": [],
          "username": "mmaqbour@gmail.com",
          "accountNonExpired": true,
          "accountNonLocked": true,
          "credentialsNonExpired": true,
          "enabled": true
      },
      "createdAt": "2025-03-08",
      "updatedAt": "2025-03-08"
    },
    {
      "id": 1,
      "name": "eminem",
      "description": "a ceremony of eminem birthday",
      "location": "CA. Los Angeles",
      "category": "hip hop",
      "eventDateTime": "2025-05-20T18:00:00",
      "price": 500.00,
      "totalTickets": 500,
      "availableTickets": 500,
      "imageUrl": "https://loremflickr.com/cache/resized/defaultImage.small_1000_600_nofilter.jpg",
      "user": {
          "id": 2,
          "name": "rennacir",
          "email": "rennacir@gmail.com",
          "createdAt": "2025-03-08T18:04:05.689+00:00",
          "updatedAt": "2025-03-08T18:04:05.689+00:00",
          "authorities": [],
          "username": "rennacir@gmail.com",
          "accountNonExpired": true,
          "accountNonLocked": true,
          "credentialsNonExpired": true,
          "enabled": true
      },
      "createdAt": "2025-03-08",
      "updatedAt": "2025-03-08"
    },
    {
      "id": 1,
      "name": "eminem",
      "description": "a ceremony of eminem birthday",
      "location": "CA. Los Angeles",
      "category": "hip hop",
      "eventDateTime": "2025-05-20T18:00:00",
      "price": 500.00,
      "totalTickets": 500,
      "availableTickets": 500,
      "imageUrl": "https://loremflickr.com/cache/resized/defaultImage.small_1000_600_nofilter.jpg",
      "user": {
          "id": 2,
          "name": "rennacir",
          "email": "rennacir@gmail.com",
          "createdAt": "2025-03-08T18:04:05.689+00:00",
          "updatedAt": "2025-03-08T18:04:05.689+00:00",
          "authorities": [],
          "username": "rennacir@gmail.com",
          "accountNonExpired": true,
          "accountNonLocked": true,
          "credentialsNonExpired": true,
          "enabled": true
      },
      "createdAt": "2025-03-08",
      "updatedAt": "2025-03-08"
    }
  ]

  isBefore(item: any): boolean {
    if (new Date(item.eventDateTime) < new Date())
      return true
    return false
  }
}
