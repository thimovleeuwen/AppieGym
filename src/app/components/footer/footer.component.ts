import { ChangeDetectionStrategy, Component, computed } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TranslationService } from "../../services/translation.service";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./footer.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
  readonly t = computed(() => this.translation.dict().footer);

  constructor(private readonly translation: TranslationService) {}
}
