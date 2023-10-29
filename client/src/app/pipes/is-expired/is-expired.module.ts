import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IsExpiredPipe } from "./is-expired.pipe";

@NgModule({
  declarations: [IsExpiredPipe],
  imports: [CommonModule],
  exports: [IsExpiredPipe],
})
export class IsExpiredModule {}
