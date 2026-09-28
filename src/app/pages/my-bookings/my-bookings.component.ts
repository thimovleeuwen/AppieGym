import { ChangeDetectionStrategy, Component, computed, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { CLASSES, DISCIPLINE_COLORS } from "../../data/schedule";
import type { ClassTemplate, Reservation } from "../../data/types";
import { MemberModalComponent } from "../../components/member-modal/member-modal.component";
import { BookingService } from "../../services/booking.service";
import { TranslationService } from "../../services/translation.service";
import { formatTimeRange, getWeekDates, isPastDateTime } from "../../lib/week";

interface ReservedClass {
  reservation: Reservation;
  classTemplate: ClassTemplate;
}

@Component({
  selector: "app-my-bookings",
  standalone: true,
  imports: [RouterLink, MemberModalComponent],
  templateUrl: "./my-bookings.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyBookingsComponent {
  readonly disciplineColors = DISCIPLINE_COLORS;
  readonly isPastDateTime = isPastDateTime;

  readonly modalOpen = signal(false);
  /** Every date the schedule currently allows booking (this week + next week). */
  private readonly bookableDates = [...getWeekDates(0), ...getWeekDates(1)];

  readonly t = computed(() => this.translation.dict().myBookings);

  readonly myReservations = computed<ReservedClass[]>(() => {
    const member = this.booking.member();
    if (!member) return [];
    return this.booking
      .reservations()
      .filter((r) => r.memberEmail === member.email && this.bookableDates.includes(r.dateISO))
      .map((r) => ({ reservation: r, classTemplate: CLASSES.find((c) => c.id === r.classId)! }))
      .filter((x) => x.classTemplate)
      .sort((a, b) => {
        if (a.reservation.dateISO !== b.reservation.dateISO) {
          return a.reservation.dateISO.localeCompare(b.reservation.dateISO);
        }
        return a.classTemplate.time.localeCompare(b.classTemplate.time);
      });
  });

  constructor(
    readonly booking: BookingService,
    readonly translation: TranslationService,
  ) {
    if (!booking.member()) this.modalOpen.set(true);
  }

  welcomeText(name: string): string {
    return this.translation.interpolate(this.t().welcomeTemplate, { name: this.firstName(name) });
  }

  weekdayShort(dayIndex: number): string {
    return this.translation.dict().schedule.weekdaysShort[dayIndex];
  }

  disciplineLabel(d: ClassTemplate["discipline"]): string {
    return this.translation.dict().disciplines[d];
  }

  nameLabel(c: ClassTemplate): string {
    return this.translation.pick(c.nameEn, c.nameNl);
  }

  dayNumber(dateISO: string): string {
    return String(new Date(`${dateISO}T00:00:00`).getDate());
  }

  timeRangeLabel(time: string, durationMin: number): string {
    return formatTimeRange(time, durationMin, this.translation.lang());
  }

  firstName(name: string): string {
    return name.split(" ")[0];
  }
}
