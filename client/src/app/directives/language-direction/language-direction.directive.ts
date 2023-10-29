import { Directive, ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Directive({
  selector: "[langDirection]",
})
export class LanguageDirectionDirective {
  constructor(
    private readonly elementRef: ElementRef,
    private readonly translateService: TranslateService
  ) {
    const isLtrLanguage = this.translateService.currentLang !== "he";
    this.elementRef.nativeElement.dir = isLtrLanguage ? "ltr" : "rtl";
    this.elementRef.nativeElement.style.textAlign = isLtrLanguage
      ? "left"
      : "right";
  }
}
