import { ChangeDetectionStrategy, Component, computed } from "@angular/core";
import { RouterLink } from "@angular/router";
import { CLASSES, DISCIPLINE_COLORS } from "../../data/schedule";
import type { ClassTemplate } from "../../data/types";
import { TranslationService } from "../../services/translation.service";
import { formatTimeRange, getWeekDates, isToday } from "../../lib/week";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./home.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly disciplineColors = DISCIPLINE_COLORS;
  readonly t = computed(() => this.translation.dict().home);

  readonly todaysClasses: ClassTemplate[];
  readonly todayIso: string;
  private readonly todayDayIndex: number;

  constructor(readonly translation: TranslationService) {
    const weekDates = getWeekDates(0);
    const todayIndex = weekDates.findIndex(isToday);
    this.todayDayIndex = todayIndex >= 0 ? todayIndex : 0;
    this.todayIso = weekDates[this.todayDayIndex];
    this.todaysClasses = CLASSES.filter((c) => c.day === this.todayDayIndex)
      .sort((a, b) => a.time.localeCompare(b.time))
      .slice(0, 4);
  }

  disciplineLabel(d: ClassTemplate["discipline"]): string {
    return this.translation.dict().disciplines[d];
  }

  nameLabel(c: ClassTemplate): string {
    return this.translation.pick(c.nameEn, c.nameNl);
  }

  timeRangeLabel(time: string, durationMin: number): string {
    return formatTimeRange(time, durationMin, this.translation.lang());
  }
}
