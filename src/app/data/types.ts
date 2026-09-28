export type Discipline = "Kickboxing" | "BagTraining" | "MMA" | "Conditioning" | "Kids";

export type Level = "All levels" | "Beginner" | "Intermediate" | "Advanced";

export type WeekdayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Monday

export interface ClassTemplate {
  id: string;
  day: WeekdayIndex;
  time: string; // "HH:mm"
  durationMin: number;
  nameEn: string;
  nameNl: string;
  discipline: Discipline;
  coach: string;
  level: Level;
  capacity: number;
  /** Booked spots, so "spots left" reflects real availability. */
  baseBooked: number;
}

export interface Reservation {
  classId: string;
  dateISO: string;
  memberEmail: string;
  createdAt: string;
}

export interface Member {
  name: string;
  email: string;
}
