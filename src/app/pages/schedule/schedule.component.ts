import { ChangeDetectionStrategy, Component, computed, signal } from "@angular/core";
import { Router } from "@angular/router";
import { CLASSES } from "../../data/schedule";
import type { Discipline } from "../../data/types";
import { ClassRowComponent } from "../../components/class-row/class-row.component";
import { TranslationService } from "../../services/translation.service";
import { formatDayDate, getCurrentWeekDates, isToday } from "../../lib/week";

type DisciplineFilter = Discipline | "All";

const DISCIPLINE_FILTERS: DisciplineFilter[] = [
  "All",
  "Kickboxing",
  "BagTraining",
  "MMA",
  "Conditioning",
  "Kids",
];

@Component({
  selector: "app-schedule",
  standalone: true,
  imports: [ClassRowComponent],
  templateUrl: "./schedule.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleComponent {
  readonly disciplineFilters = DISCIPLINE_FILTERS;
  readonly weekDates = getCurrentWeekDates();
  readonly todayIndex = this.weekDates.findIndex(isToday);

  readonly dayIndex = signal(0);
  readonly filter = signal<DisciplineFilter>("All");

  readonly dateISO = computed(() => this.weekDates[this.dayIndex()]);
  readonly classesForDay = computed(() => {
    const day = this.dayIndex();
    const filter = this.filter();
    return CLASSES.filter((c) => c.day === day)
      .filter((c) => filter === "All" || c.discipline === filter)
      .sort((a, b) => a.time.localeCompare(b.time));
  });

  readonly t = computed(() => this.translation.dict().schedule);
  readonly noClassesText = computed(() =>
    this.translation.interpolate(this.t().noClassesTemplate, {
      day: this.t().weekdaysLong[this.dayIndex()],
    }),
  );

  constructor(
    router: Router,
    readonly translation: TranslationService,
  ) {
    const state = router.getCurrentNavigation()?.extras.state as
      | { dateISO?: string }
      | undefined;
    const requestedIndex = state?.dateISO ? this.weekDates.indexOf(state.dateISO) : -1;
    const initial = requestedIndex >= 0 ? requestedIndex : this.todayIndex >= 0 ? this.todayIndex : 0;
    this.dayIndex.set(initial);
  }

  disciplineLabel(d: DisciplineFilter): string {
    return d === "All" ? this.t().allFilter : this.translation.dict().disciplines[d];
  }

  dayLabel(dateISO: string): string {
    return formatDayDate(dateISO, this.translation.lang());
  }
}
