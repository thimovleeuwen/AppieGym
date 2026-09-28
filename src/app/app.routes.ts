import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { ScheduleComponent } from "./pages/schedule/schedule.component";
import { MyBookingsComponent } from "./pages/my-bookings/my-bookings.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "schedule", component: ScheduleComponent },
  { path: "my-bookings", component: MyBookingsComponent },
  { path: "**", component: NotFoundComponent },
];
