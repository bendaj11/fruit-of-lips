import { Injectable } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
import { map } from "rxjs";
import { Chapter } from "../../../../assets/models/chapter.model";

@Injectable()
export class ChapterQueriesService {
  constructor(private readonly apollo: Apollo) {}

  fetchAllChapters() {
    return this.apollo
      .query<{ fetchAllChapters: Chapter[] }>({
        query: gql`
          query fetchAllChapters {
            fetchAllChapters: chapters {
              id
              hebrewText
              englishText
              hebrewReference
              englishReference
            }
          }
        `,
      })
      .pipe(map((response) => response.data.fetchAllChapters));
  }
}
