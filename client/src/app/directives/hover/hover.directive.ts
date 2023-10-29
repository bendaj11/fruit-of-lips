import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[hover]",
})
export class HoverDirective {
  @Input() hoverClass: string = "";
  @Input() removeClass: string = "";

  constructor(public elementRef: ElementRef) {}

  @HostListener("mouseenter") onMouseEnter() {
    if (this.hoverClass) {
      this.elementRef.nativeElement.classList.add(
        ...this.hoverClass.split(" ")
      );
    }

    if (this.removeClass) {
      this.elementRef.nativeElement.classList.remove(
        ...this.removeClass.split(" ")
      );
    }
  }

  @HostListener("mouseleave") onMouseLeave() {
    if (this.hoverClass) {
      this.elementRef.nativeElement.classList.remove(
        ...this.hoverClass.split(" ")
      );
    }

    if (this.removeClass) {
      this.elementRef.nativeElement.classList.add(
        ...this.removeClass.split(" ")
      );
    }
  }
}
