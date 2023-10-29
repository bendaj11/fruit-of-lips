import { Directive, ElementRef, Input, OnInit } from "@angular/core";
import { Dictionary } from "@ngrx/entity";
import { TranslateService } from "@ngx-translate/core";

@Directive({
  selector: "[styleByLang]",
})
export class StyleByLanguageDirective implements OnInit {
  @Input() styleByLang: Dictionary<string | string[]>;

  constructor(
    private elementRef: ElementRef,
    private readonly translateService: TranslateService
  ) {}

  ngOnInit() {
    this.elementRef.nativeElement.classList.add(
      this.styleByLang[this.translateService.currentLang]
    );
  }
}
