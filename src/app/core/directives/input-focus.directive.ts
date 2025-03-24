import { AfterViewInit, Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appInputFocus]'
})
export class InputFocusDirective implements AfterViewInit {
  private elementRef = inject(ElementRef);

  ngAfterViewInit(): void {    
      this.elementRef.nativeElement.focus();
  }
}
