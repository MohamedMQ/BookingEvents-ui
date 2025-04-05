import { Component, ElementRef, inject, Input, OnInit } from '@angular/core';
import {
  faDollarSign,
  faCircleExclamation,
  faCircleXmark,
  faSpinner,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../../core/services/event.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Store } from '@ngrx/store';
import { selectUserId } from '../../../store/selectors/user.selector';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-event-form',
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css',
})
export class EventFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private eventService = inject(EventService);
  private activatedRoute = inject(ActivatedRoute);
  private httpClient = inject(HttpClient);
  private elementRef = inject(ElementRef);
  private store = inject(Store);
  private toastrService = inject(ToastrService);

  faDollarSign = faDollarSign;
  faCircleExclamation = faCircleExclamation;
  faCircleXmark = faCircleXmark;
  faSpinner = faSpinner;
  faCaretDown = faCaretDown;

  @Input() type!: string;
  @Input() eventId: any;

  notUpdated = false;
  isSubmited = false;
  start: boolean = false;
  isLoading: boolean = false;
  isFetching: boolean = true;
  fileName: String = 'No file chosen';
  private imageBaseUrl = environment.imageBaseUrl;
  userId$ = this.store.select(selectUserId);

  eventCategories = [
    { value: 'MUSIC', label: 'Music' },
    { value: 'ART', label: 'Art' },
    { value: 'THEATER', label: 'Theater' },
    { value: 'DANCE', label: 'Dance' },
    { value: 'COMEDY', label: 'Comedy' },
    { value: 'EDUCATION', label: 'Education' },
    { value: 'WORKSHOP', label: 'Workshop' },
    { value: 'CONFERENCE', label: 'Conference' },
    { value: 'NETWORKING', label: 'Networking' },
    { value: 'TECHNOLOGY', label: 'Technology' },
    { value: 'GAMING', label: 'Gaming' },
    { value: 'SPORTS', label: 'Sports' },
    { value: 'FITNESS', label: 'Fitness' },
    { value: 'WELLNESS', label: 'Wellness' },
    { value: 'HEALTH', label: 'Health' },
    { value: 'FOOD', label: 'Food' },
    { value: 'DRINK', label: 'Drink' },
    { value: 'TRAVEL', label: 'Travel' },
    { value: 'CHARITY', label: 'Charity' },
    { value: 'FASHION', label: 'Fashion' },
    { value: 'CULTURE', label: 'Culture' },
    { value: 'STARTUP', label: 'Startup' },
    { value: 'BUSINESS', label: 'Business' },
    { value: 'RELIGION', label: 'Religion' },
    { value: 'COMMUNITY', label: 'Community' },
  ];

  createFileList(files: File[]): FileList {
    const dataTransfer = new DataTransfer();
    files.forEach(file => dataTransfer.items.add(file));
    return dataTransfer.files;
  }

  ngOnInit(): void {
    if (this.type === "update") {
      this.isFetching = true;
      this.activatedRoute
        .paramMap
        .subscribe(params => {
          this.eventId = Number(params.get('eventId'));
          this.userId$.subscribe((userId) => {
            this.eventService
              .protectedEvent(this.eventId)
              .subscribe({
                next: (res) => {
                  this.form.controls['name'].setValue(res.data.name);
                  this.form.controls['description'].setValue(res.data.description);
                  this.form.controls['category'].setValue(res.data.category);
                  this.form.controls['totalTickets'].setValue(res.data.totalTickets);
                  this.form.controls['location'].setValue(res.data.location);
                  this.form.controls['eventDateTime'].setValue(res.data.eventDateTime);
                  this.form.controls['price'].setValue(res.data.price);
                  if (res.data.ticketNumber !== res.data.totalTickets) {
                    this.form.controls['location'].disable();
                    this.form.controls['eventDateTime'].disable();
                    this.form.controls['price'].disable();
                    this.form.controls['totalTickets'].setValidators([Validators.min(Number(res.data.totalTickets))]);
                    this.form.controls['totalTickets'].updateValueAndValidity();
                  }
                  if (res.data.imageUrl) {
                    let imageName = res.data.imageUrl.slice(res.data.imageUrl.lastIndexOf('/') + 1);
                    if (imageName === "default.jpg") {
                      this.httpClient
                        .get<any>(`${this.imageBaseUrl}/uploads/users/events/default.jpg`, { responseType: 'blob' as 'json' })
                        .subscribe({
                          next: (blob: Blob) => {
                            const file = new File([blob], 'default.jpg', { type: blob.type });
                            const dataTransfer = new DataTransfer();
                            dataTransfer.items.add(file);
                            const input = this.elementRef.nativeElement as HTMLInputElement;
                            if (dataTransfer.files) {
                              input.files = dataTransfer.files;
                              this.form.controls['image'].setValue(file);
                              this.onFileChange(this.elementRef);
                            }
                            this.isFetching = false;
                          },
                          error: (err) => {
                            this.toastrService.error(err.error.message, 'Error');
                          }
                        })
                    } else {
                      this.httpClient
                        .get<any>(`${this.imageBaseUrl}/uploads/users/events/${res.data.user.id}/${imageName}`, { responseType: 'blob' as 'json' })
                        .subscribe({
                          next: (blob: Blob) => {
                            const file = new File([blob], imageName, { type: blob.type });
                            const dataTransfer = new DataTransfer();
                            dataTransfer.items.add(file);
                            const input = this.elementRef.nativeElement as HTMLInputElement;
                            if (dataTransfer.files) {
                              input.files = dataTransfer.files;
                              this.form.controls['image'].setValue(file);
                              this.onFileChange(this.elementRef);
                            }
                            this.isFetching = false;
                          },
                          error: (err) => {
                            this.toastrService.error(err.error.message, 'Error');
                          }
                        })
                    }
                  } else
                    this.isFetching = false;
                },
                error: (err) => {
                  this.toastrService.error(err.error.message, 'Error');
                  this.router.navigate(['/events']);
                }
              })
          })
        })
    } else
      this.isFetching = false;
  }

  form: FormGroup = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9][a-zA-Z0-9 -]{3,48}[a-zA-Z0-9]$/),
      ],
    ],
    description: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[\w\d\s.,!?&'\"()-]{20,500}$/),
      ],
    ],
    location: [
      {
        value: '',
        disabled: false
      },
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9\s.,'-]{5,100}$/)
      ],
    ],
    category: [
      '',
      [Validators.required],
    ],
    eventDateTime: [
      {
        value: '',
        disabled: false
      },
      [
        Validators.required,
        this.minDateValidator
      ]
    ],
    price: [
      {
        value: 5,
        disabled: false
      },
      [
        Validators.required,
        Validators.min(5),
        Validators.pattern(/^\d{1,4}(\.\d{1,2})?$/)
      ],
    ],
    totalTickets: [
      5,
      [
        Validators.required,
        Validators.min(1), // SHOULD BE 5
        Validators.pattern(/^\d{1,4}$/)
      ],
    ],
    image: [
      '',
      []
    ],
  });

  imageValidator(control: AbstractControl): ValidationErrors | null {
    return {
      invalidImage: 'The file must be an image (JPEG, PNG, GIF, WebP).',
    };
  }

  minDateValidator(control: AbstractControl): ValidationErrors | null {
    const currentDate = new Date();
    const selectedDate = new Date(control.value);

    if (selectedDate < currentDate)
      return { minDate: 'Date cannot be in the past' };
    return null;
  }

  onFileChange(event: Event | ElementRef<HTMLInputElement>): void {
    let input: HTMLInputElement | null;
    if (event instanceof ElementRef)
      input = event.nativeElement as HTMLInputElement;
    else
      input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      const validImageTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
      ];
      if (validImageTypes.includes(input.files[0].type)) {
        let file = input.files[0];
        this.form.controls['image'].setValue(file);
        this.fileName = URL.createObjectURL(file);
        this.form.controls['image']?.clearValidators();
      } else {
        this.fileName = 'No file chosen';
        this.form.controls['image']?.setValidators([this.imageValidator]);
      }
    } else if (!this.form.get('image')) {
      this.fileName = 'No file chosen';
      this.form.controls['image']?.clearValidators();
    }
    this.form.controls['image']?.updateValueAndValidity();
  }

  removeImage() {
    this.fileName = 'No file chosen';
    this.form.controls['image'].setValue('');
  }

  onCreateOrUpdate() {
    this.isSubmited = true;
    if (this.form.invalid) return;
    console.log(this.form);

    const formData = new FormData();
    formData.append('name', this.form.get('name')?.value);
    formData.append('description', this.form.get('description')?.value);
    formData.append('location', this.form.get('location')?.value);
    formData.append('category', this.form.get('category')?.value);
    formData.append('price', this.form.get('price')?.value);
    formData.append('totalTickets', this.form.get('totalTickets')?.value);
    const eventDateTime = this.form.get('eventDateTime')?.value;
    const formattedDateTime = new Date(eventDateTime).toISOString().split('Z')[0];
    formData.append('eventDateTime', formattedDateTime);

    const image = this.form.get('image')?.value;
    if (image instanceof File) {
      formData.append('image', image, image.name);
    }
    this.isLoading = true;
    if (this.type === "create")
      this.eventService
        .protectedEvent(formData)
        .subscribe({
          next: (res) => {
            this.toastrService.success(res.message, 'Success');
            this.router.navigate([`/events/${res.data.id}`]);
            this.isLoading = false;
          },
          error: (err) => {
            this.toastrService.error(err.error.message, 'Error');
            this.isLoading = false;
          }
        })
    else
      this.eventService
        .protectedEventPut(this.eventId, formData)
        .subscribe({
          next: (res) => {
            this.toastrService.success(res.message, 'Success');
            this.router.navigate([`/events/${res.data.id}`]);
            this.isLoading = false;
          },
          error: (err) => {
            this.toastrService.error(err.error.message, 'Error');
            this.isLoading = false;
          }
      })
  }
}
