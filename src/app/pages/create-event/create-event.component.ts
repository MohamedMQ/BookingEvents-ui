import { Component, inject } from '@angular/core';
import { EventFormComponent } from '../shared/event-form/event-form.component';
import { Observable } from 'rxjs';
import { EventService } from '../../core/services/event.service';

@Component({
  selector: 'app-create-event',
  imports: [EventFormComponent],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css',
})
export class CreateEventComponent {
  type: string = "create";
}
