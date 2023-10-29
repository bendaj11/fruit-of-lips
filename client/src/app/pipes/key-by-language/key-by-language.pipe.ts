import { Pipe, PipeTransform } from "@angular/core";
import { Dictionary } from "@ngrx/entity";
import { TranslateService } from "@ngx-translate/core";
import { Chapter } from "../../../assets/models/chapter.model";

@Pipe({
  name: "keyByLang",
})
export class KeyByLanguagePipe implements PipeTransform {
  constructor(private readonly translateService: TranslateService) {}

  transform(value: any, keyByLanguageMap: Dictionary<string>) {
    const key = keyByLanguageMap[this.translateService.currentLang];

    return value && key ? value[key] : undefined;
  }
}
