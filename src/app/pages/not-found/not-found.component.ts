import { ChangeDetectionStrategy, Component, computed } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TranslationService } from "../../services/translation.service";

@Component({
  selector: "app-not-found",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./not-found.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {
  readonly t = computed(() => this.translation.dict().notFound);

  constructor(private readonly translation: TranslationService) {}
}
