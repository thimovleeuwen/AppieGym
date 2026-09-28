import { ChangeDetectionStrategy, Component, computed, input, output, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BookingService } from "../../services/booking.service";
import { TranslationService } from "../../services/translation.service";

@Component({
  selector: "app-member-modal",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./member-modal.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberModalComponent {
  readonly open = input(false);
  readonly pendingReservation = input<{ classId: string; dateISO: string } | null>(null);

  readonly closed = output<void>();
  readonly signedIn = output<void>();

  readonly name = signal("");
  readonly email = signal("");
  readonly error = signal("");

  readonly t = computed(() => this.translation.dict().memberModal);

  constructor(
    private readonly booking: BookingService,
    private readonly translation: TranslationService,
  ) {}

  handleSubmit(): void {
    const name = this.name().trim();
    const email = this.email().trim();
    const t = this.t();

    if (!name || !email) {
      this.error.set(t.errorRequired);
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      this.error.set(t.errorEmail);
      return;
    }

    const member = { name, email: email.toLowerCase() };
    const pending = this.pendingReservation();
    if (pending) {
      this.booking.signInAndReserve(member, pending.classId, pending.dateISO);
    } else {
      this.booking.signIn(member);
    }

    this.name.set("");
    this.email.set("");
    this.error.set("");
    this.signedIn.emit();
  }

  close(): void {
    this.closed.emit();
  }
}
