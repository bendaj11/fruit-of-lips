import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from "@angular/core";

@Directive({
  selector: "[aos]",
})
export class AosDirective implements OnInit {
  @Input() delay = 0;
  @Input() duration = 1;
  @Input() animation: string = "";

  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.classList.add("animate__animated");
  }

  ngOnInit(): void {
    this.onWindowScroll();
  }

  @HostListener("window:scroll", [])
  public onWindowScroll(): void {
    this.considerAnimation();
  }

  considerAnimation(): void {
    const scrollPosition = window.pageYOffset + window.innerHeight;

    if (this.elementRef?.nativeElement.offsetTop <= scrollPosition) {
      this.elementRef.nativeElement.classList.add(`animate__${this.animation}`);
      this.elementRef.nativeElement.style.animationDuration = `${this.duration}s`;
      this.elementRef.nativeElement.style.animationDelay = `${this.delay}s`;
    } else {
      this.elementRef.nativeElement.classList.remove(
        `animate__${this.animation}`
      );
    }
  }
}
