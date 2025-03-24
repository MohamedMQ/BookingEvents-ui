import { Component, inject, OnInit } from '@angular/core';
import { EventFormComponent } from '../shared/event-form/event-form.component';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-update-event',
  imports: [
    EventFormComponent,
    CommonModule,
    FontAwesomeModule,
    EventFormComponent
  ],
  templateUrl: './update-event.component.html',
  styleUrl: './update-event.component.css',
})
export class UpdateEventComponent {
  type: string = "update";
}
