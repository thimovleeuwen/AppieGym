import type { ClassTemplate } from "./types";

export const DISCIPLINE_COLORS: Record<string, string> = {
  Kickboxing: "bg-crimson/15 text-crimson-glow ring-crimson/30",
  BagTraining: "bg-amber-500/15 text-amber-400 ring-amber-500/30",
  MMA: "bg-violet-500/15 text-violet-400 ring-violet-500/30",
  Conditioning: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30",
  Kids: "bg-sky-500/15 text-sky-400 ring-sky-500/30",
};

/**
 * The real weekly class schedule. Every class currently has 18 of 18 spots
 * free (capacity 18, none booked yet) and the source schedule doesn't list
 * a duration, so each class defaults to 60 minutes.
 */
export const CLASSES: ClassTemplate[] = [
  // Monday
  { id: "mon-1000-zak", day: 0, time: "10:00", durationMin: 60, nameEn: "Bag Training", nameNl: "Zaktraining", discipline: "BagTraining", coach: "Achmed", level: "All levels", capacity: 18, baseBooked: 0 },
  { id: "mon-1700-zak-girls", day: 0, time: "17:00", durationMin: 60, nameEn: "Bag Training · Girls Only (Room 2)", nameNl: "Zaktraining · Girls only (Zaal 2)", discipline: "BagTraining", coach: "Valentina", level: "All levels", capacity: 18, baseBooked: 0 },
  { id: "mon-1800-kb", day: 0, time: "18:00", durationMin: 60, nameEn: "Kickboxing · All Levels", nameNl: "Kickboksen · All levels", discipline: "Kickboxing", coach: "Achmed", level: "All levels", capacity: 18, baseBooked: 0 },
  { id: "mon-1900-zak", day: 0, time: "19:00", durationMin: 60, nameEn: "Bag Training", nameNl: "Zaktraining", discipline: "BagTraining", coach: "Achmed", level: "All levels", capacity: 18, baseBooked: 0 },
  { id: "mon-2015-kbzak-women", day: 0, time: "20:15", durationMin: 60, nameEn: "Kickboxing/Bag Training · Women Only", nameNl: "Kickboksen/Zaktraining · Women only", discipline: "Kickboxing", coach: "Truus", level: "All levels", capacity: 18, baseBooked: 0 },

  // Tuesday
  { id: "tue-0800-zak", day: 1, time: "08:00", durationMin: 60, nameEn: "Bag Training", nameNl: "Zaktraining", discipline: "BagTraining", coach: "Achmed", level: "All levels", capacity: 18, baseBooked: 0 },
  { id: "tue-1600-kb-kids6", day: 1, time: "16:00", durationMin: 60, nameEn: "Kickboxing · Kids 6–12", nameNl: "Kickboksen · Kids 6–12 jaar", discipline: "Kids", coach: "Achmed", level: "All levels", capacity: 18, baseBooked: 0 },
  { id: "tue-1700-kb-kids12", day: 1, time: "17:00", durationMin: 60, nameEn: "Kickboxing · Kids 12–15", nameNl: "Kickboksen · Kids 12–15 jaar", discipline: "Kids", coach: "Achmed", level: "All levels", capacity: 18, baseBooked: 0 },
  { id: "tue-1800-zak", day: 1, time: "18:00", durationMin: 60, nameEn: "Bag Training", nameNl: "Zaktraining", discipline: "BagTraining", coach: "Lou", level: "All levels", capacity: 18, baseBooked: 0 },
  { id: "tue-1800-sc", day: 1, time: "18:00", durationMin: 60, nameEn: "Strength & Conditioning", nameNl: "Strength & conditioning", discipline: "Conditioning", coach: "Achmed", level: "All levels", capacity: 18, baseBooked: 0 },
  { id: "tue-1900-kb-beg", day: 1, time: "19:00", durationMin: 60, nameEn: "Kickboxing Beginners", nameNl: "Kickboksen beginners", discipline: "Kickboxing", coach: "Chahid", level: "Beginner", capacity: 18, baseBooked: 0 },
  { id: "tue-1900-zak", day: 1, time: "19:00", durationMin: 60, nameEn: "Bag Training", nameNl: "Zaktraining", discipline: "BagTraining", coach: "Achmed", level: "All levels", capacity: 18, baseBooked: 0 },
  { id: "tue-2000-mma", day: 1, time: "20:00", durationMin: 60, nameEn: "MMA", nameNl: "MMA", discipline: "MMA", coach: "Bennie", level: "All levels", capacity: 18, baseBooked: 0 },

  // Wednesday
  { id: "wed-0800-zak", day: 2, time: "08:00", durationMin: 60, nameEn: "Bag Training", nameNl: "Zaktraining", discipline: "BagTraining", coach: "Achmed", level: "All levels", capacity: 18, baseBooked: 0 },
  { id: "wed-1800-kb", day: 2, time: "18:00", durationMin: 60, nameEn: "Kickboxing · All Levels", nameNl: "Kickboksen · All levels", discipline: "Kickboxing", coach: "Achmed", level: "All levels", capacity: 18, baseBooked: 0 },
  { id: "wed-2000-kbzak-women", day: 2, time: "20:00", durationMin: 60, nameEn: "Kickboxing/Bag Training · Women Only", nameNl: "Kickboksen/Zaktraining · Women only", discipline: "Kickboxing", coach: "Valentina", level: "All levels", capacity: 18, baseBooked: 0 },

  // Thursday
  { id: "thu-0800-zak", day: 3, time: "08:00", durationMin: 60, nameEn: "Bag Training", nameNl: "Zaktraining", discipline: "BagTraining", coach: "Achmed", level: "All levels", capacity: 18, baseBooked: 0 },
  { id: "thu-1700-zak-girls16", day: 3, time: "17:00", durationMin: 60, nameEn: "Bag Training · Girls Only (Under 16)", nameNl: "Zaktraining · Girls only (<16)", discipline: "BagTraining", coach: "Valentina", level: "All levels", capacity: 18, baseBooked: 0 },
  { id: "thu-1800-sc", day: 3, time: "18:00", durationMin: 60, nameEn: "Strength & Conditioning", nameNl: "Strength & conditioning", discipline: "Conditioning", coach: "Achmed", level: "All levels", capacity: 18, baseBooked: 0 },
  { id: "thu-1900-zak", day: 3, time: "19:00", durationMin: 60, nameEn: "Bag Training", nameNl: "Zaktraining", discipline: "BagTraining", coach: "Achmed", level: "All levels", capacity: 18, baseBooked: 0 },
  { id: "thu-1900-kb-beg", day: 3, time: "19:00", durationMin: 60, nameEn: "Kickboxing Beginners", nameNl: "Kickboksen beginners", discipline: "Kickboxing", coach: "Achmed", level: "Beginner", capacity: 18, baseBooked: 0 },

  // Friday
  { id: "fri-1000-zakbbb-ladies", day: 4, time: "10:00", durationMin: 60, nameEn: "Bag Training / BBB · Ladies Only", nameNl: "Zaktraining / BBB · Ladies only", discipline: "BagTraining", coach: "Suza", level: "All levels", capacity: 18, baseBooked: 0 },
  { id: "fri-1600-kb-kids6", day: 4, time: "16:00", durationMin: 60, nameEn: "Kickboxing · Kids 6–12", nameNl: "Kickboksen · Kids 6–12 jaar", discipline: "Kids", coach: "Achmed", level: "All levels", capacity: 18, baseBooked: 0 },
  { id: "fri-1700-kb-kids12", day: 4, time: "17:00", durationMin: 60, nameEn: "Kickboxing · Kids 12–15", nameNl: "Kickboksen · Kids 12–15 jaar", discipline: "Kids", coach: "Achmed", level: "All levels", capacity: 18, baseBooked: 0 },
  { id: "fri-1800-kb", day: 4, time: "18:00", durationMin: 60, nameEn: "Kickboxing · All Levels", nameNl: "Kickboksen · All levels", discipline: "Kickboxing", coach: "Achmed", level: "All levels", capacity: 18, baseBooked: 0 },
  { id: "fri-1900-zak", day: 4, time: "19:00", durationMin: 60, nameEn: "Bag Training", nameNl: "Zaktraining", discipline: "BagTraining", coach: "Evelien", level: "All levels", capacity: 18, baseBooked: 0 },

  // Saturday
  { id: "sat-0900-zak", day: 5, time: "09:00", durationMin: 60, nameEn: "Bag Training", nameNl: "Zaktraining", discipline: "BagTraining", coach: "Achmed", level: "All levels", capacity: 18, baseBooked: 0 },
  { id: "sat-1300-zak", day: 5, time: "13:00", durationMin: 60, nameEn: "Bag Training", nameNl: "Zaktraining", discipline: "BagTraining", coach: "Achmed", level: "All levels", capacity: 18, baseBooked: 0 },

  // Sunday
  { id: "sun-0900-zak", day: 6, time: "09:00", durationMin: 60, nameEn: "Bag Training", nameNl: "Zaktraining", discipline: "BagTraining", coach: "Achmed", level: "All levels", capacity: 18, baseBooked: 0 },
  { id: "sun-1300-zak", day: 6, time: "13:00", durationMin: 60, nameEn: "Bag Training", nameNl: "Zaktraining", discipline: "BagTraining", coach: "Achmed", level: "All levels", capacity: 18, baseBooked: 0 },
];
