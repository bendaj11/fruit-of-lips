import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { selectIsSilent } from "../reducer/navbar.reducer";

@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  isNavbarOpen = false;
  isNavbarSilent$ = this.store.select(selectIsSilent);
  window = window;

  constructor(private readonly store: Store, private readonly router: Router) {}

  navigateHome(): void {
    this.isNavbarOpen = false;
    this.router.navigateByUrl("/home");
  }

  calc() {
    const y = window.innerHeight / 2.1 - window.scrollY;

    return y >= 0 ? y : 0;
  }
}
