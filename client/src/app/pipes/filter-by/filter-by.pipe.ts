import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterBy",
})
export class FilterByPipe implements PipeTransform {
  transform<T, K extends keyof T>(
    items: T[],
    searchValue: string,
    keys: K[]
  ): T[] {
    if (!searchValue) {
      return items;
    }

    const regex = new RegExp(searchValue, "gi");

    return items.filter((item) =>
      keys.some(
        (key) =>
          FilterByPipe.isStringAndMatch(item[key], regex) ||
          (Array.isArray(item[key]) &&
            Array(item[key])
              .flat()
              .some((value) => FilterByPipe.isStringAndMatch(value, regex)))
      )
    );
  }

  private static isStringAndMatch(value: unknown, regex: RegExp) {
    return typeof value === "string" && String(value).match(regex);
  }
}
