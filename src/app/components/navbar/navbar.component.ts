import { ChangeDetectionStrategy, Component, computed, signal } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { BookingService } from "../../services/booking.service";
import { TranslationService } from "../../services/translation.service";
import { MemberModalComponent } from "../member-modal/member-modal.component";

interface NavLinkItem {
  to: string;
  labelKey: "home" | "schedule" | "programs" | "pricing" | "contact";
  end: boolean;
  hashLink?: boolean;
}

const LINKS: NavLinkItem[] = [
  { to: "/", labelKey: "home", end: true },
  { to: "/schedule", labelKey: "schedule", end: false },
  { to: "/#programs", labelKey: "programs", end: false, hashLink: true },
  { to: "/#pricing", labelKey: "pricing", end: false, hashLink: true },
  { to: "/#contact", labelKey: "contact", end: false, hashLink: true },
];

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MemberModalComponent],
  templateUrl: "./navbar.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  readonly links = LINKS;
  readonly mobileOpen = signal(false);
  readonly modalOpen = signal(false);

  readonly t = computed(() => this.translation.dict().nav);

  constructor(
    readonly booking: BookingService,
    readonly translation: TranslationService,
  ) {}

  toggleMobile(): void {
    this.mobileOpen.update((v) => !v);
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
  }

  firstName(name: string): string {
    return name.split(" ")[0];
  }
}
