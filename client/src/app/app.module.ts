import { HttpClient, HttpClientModule } from "@angular/common/http";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { EffectsModule } from "@ngrx/effects";
import { routerReducer, StoreRouterConnectingModule } from "@ngrx/router-store";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { LottieModule } from "ngx-lottie";
import { catchError, firstValueFrom, map } from "rxjs";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarModule } from "./features/navbar/navbar.module";
import { HomeModule } from "./pages/home/home.module";
import { GroupModule } from "./pages/group/group.module";
import { SearchModule } from "./pages/search/search.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    HomeModule,
    NavbarModule,
    SearchModule,
    GroupModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot({ router: routerReducer }),
    LottieModule.forRoot({ player: () => import("lottie-web") }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
        deps: [HttpClient],
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory:
        (translateService: TranslateService, httpClient: HttpClient) => () =>
          firstValueFrom(
            httpClient
              .get<{ location: { country: { code: string } } }>(
                "https://api.ipregistry.co/?key=342ejuwq26ldhits"
              )
              .pipe(
                map((response) => response?.location?.country?.code),
                map((countryCode) => (countryCode === "IL" ? "he" : "en")),
                map((language) => translateService.use(language)),
                catchError(() => translateService.use("he"))
              )
          ),
      deps: [TranslateService, HttpClient],
      multi: true,
    },
  ],
})
export class AppModule {}
