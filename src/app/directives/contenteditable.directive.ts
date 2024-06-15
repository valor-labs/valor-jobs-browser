import { Directive, ElementRef, Input, Output, EventEmitter, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appContenteditable]',
  standalone: true
})
export class ContenteditableDirective {
  @Input() set appContenteditable(value: boolean) {
    this.renderer.setAttribute(this.el.nativeElement, 'contenteditable', String(value));
    if (value) {
      this.renderer.addClass(this.el.nativeElement, 'editable');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'editable');
    }
  }
  @Output() contentChange = new EventEmitter<string>();

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('blur') onBlur() {
    this.contentChange.emit(this.el.nativeElement.innerText);
  }
}
