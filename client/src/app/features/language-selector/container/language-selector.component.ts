import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "language-selector",
  templateUrl: "./language-selector.component.html",
  styleUrls: ["./language-selector.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSelectorComponent {
  constructor(public translateService: TranslateService) {}

  switchLang(lang: string) {
    this.translateService.use(lang);
    localStorage.setItem("currentLang", lang);
    window.location.reload();
  }

  getAllLanguages(): string[] {
    return this.translateService
      .getLangs()
      .filter((language) => language !== this.translateService.currentLang);
  }
}
