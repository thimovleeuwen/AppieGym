import { ChangeDetectionStrategy, Component, computed, input, signal } from "@angular/core";
import { DISCIPLINE_COLORS } from "../../data/schedule";
import type { ClassTemplate } from "../../data/types";
import { formatTimeRange, isPastDateTime } from "../../lib/week";
import { BookingService } from "../../services/booking.service";
import { TranslationService } from "../../services/translation.service";
import { MemberModalComponent } from "../member-modal/member-modal.component";

@Component({
  selector: "app-class-row",
  standalone: true,
  imports: [MemberModalComponent],
  templateUrl: "./class-row.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassRowComponent {
  readonly classTemplate = input.required<ClassTemplate>();
  readonly dateISO = input.required<string>();

  readonly modalOpen = signal(false);
  readonly disciplineColors = DISCIPLINE_COLORS;

  readonly past = computed(() =>
    isPastDateTime(this.dateISO(), this.classTemplate().time),
  );

  readonly t = computed(() => this.translation.dict().classRow);

  constructor(
    readonly booking: BookingService,
    readonly translation: TranslationService,
  ) {}

  reserved(): boolean {
    return this.booking.isReserved(this.classTemplate().id, this.dateISO());
  }

  spots(): number {
    return this.booking.spotsLeft(this.classTemplate().id, this.dateISO());
  }

  full(): boolean {
    return this.spots() <= 0 && !this.reserved();
  }

  almostFull(): boolean {
    const s = this.spots();
    return s > 0 && s <= 3;
  }

  timeRangeLabel(): string {
    return formatTimeRange(
      this.classTemplate().time,
      this.classTemplate().durationMin,
      this.translation.lang(),
    );
  }

  nameLabel(): string {
    const c = this.classTemplate();
    return this.translation.pick(c.nameEn, c.nameNl);
  }

  disciplineLabel(): string {
    return this.translation.dict().disciplines[this.classTemplate().discipline];
  }

  levelLabel(): string {
    return this.translation.dict().levels[this.classTemplate().level];
  }

  spotsLeftLabel(): string {
    return this.translation.spotsLeftLabel(this.spots());
  }

  handleClick(): void {
    if (this.past()) return;
    const c = this.classTemplate();
    const date = this.dateISO();
    if (this.reserved()) {
      this.booking.cancel(c.id, date);
      return;
    }
    if (!this.booking.member()) {
      this.modalOpen.set(true);
      return;
    }
    if (!this.full()) this.booking.reserve(c.id, date);
  }

  pendingReservation() {
    return { classId: this.classTemplate().id, dateISO: this.dateISO() };
  }
}
