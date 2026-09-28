import { Injectable, computed, effect, signal } from "@angular/core";
import { CLASSES } from "../data/schedule";
import type { Member, Reservation } from "../data/types";

const MEMBER_KEY = "appiegym.member";
const RESERVATIONS_KEY = "appiegym.reservations";

function loadMember(): Member | null {
  try {
    const raw = localStorage.getItem(MEMBER_KEY);
    return raw ? (JSON.parse(raw) as Member) : null;
  } catch {
    return null;
  }
}

function loadReservations(): Reservation[] {
  try {
    const raw = localStorage.getItem(RESERVATIONS_KEY);
    return raw ? (JSON.parse(raw) as Reservation[]) : [];
  } catch {
    return [];
  }
}

@Injectable({ providedIn: "root" })
export class BookingService {
  private readonly memberSignal = signal<Member | null>(loadMember());
  private readonly reservationsSignal = signal<Reservation[]>(loadReservations());

  readonly member = this.memberSignal.asReadonly();
  readonly reservations = this.reservationsSignal.asReadonly();

  constructor() {
    effect(() => {
      const m = this.memberSignal();
      if (m) localStorage.setItem(MEMBER_KEY, JSON.stringify(m));
      else localStorage.removeItem(MEMBER_KEY);
    });

    effect(() => {
      localStorage.setItem(
        RESERVATIONS_KEY,
        JSON.stringify(this.reservationsSignal()),
      );
    });
  }

  signIn(member: Member): void {
    this.memberSignal.set(member);
  }

  signOut(): void {
    this.memberSignal.set(null);
  }

  /**
   * Signs in and reserves in one state update, so a fresh sign-in doesn't
   * race the `member` signal update and silently drop the reservation.
   */
  signInAndReserve(member: Member, classId: string, dateISO: string): void {
    this.memberSignal.set(member);
    this.addReservation(classId, dateISO, member.email);
  }

  reserve(classId: string, dateISO: string): void {
    const member = this.memberSignal();
    if (!member) return;
    this.addReservation(classId, dateISO, member.email);
  }

  cancel(classId: string, dateISO: string): void {
    const member = this.memberSignal();
    if (!member) return;
    this.reservationsSignal.update((prev) =>
      prev.filter(
        (r) =>
          !(
            r.classId === classId &&
            r.dateISO === dateISO &&
            r.memberEmail === member.email
          ),
      ),
    );
  }

  isReserved(classId: string, dateISO: string): boolean {
    const member = this.memberSignal();
    if (!member) return false;
    return this.reservationsSignal().some(
      (r) =>
        r.classId === classId &&
        r.dateISO === dateISO &&
        r.memberEmail === member.email,
    );
  }

  spotsLeft(classId: string, dateISO: string): number {
    const template = CLASSES.find((c) => c.id === classId);
    if (!template) return 0;
    const bookedHere = this.reservationsSignal().filter(
      (r) => r.classId === classId && r.dateISO === dateISO,
    ).length;
    return Math.max(0, template.capacity - template.baseBooked - bookedHere);
  }

  private addReservation(classId: string, dateISO: string, memberEmail: string): void {
    this.reservationsSignal.update((prev) => {
      const exists = prev.some(
        (r) =>
          r.classId === classId &&
          r.dateISO === dateISO &&
          r.memberEmail === memberEmail,
      );
      if (exists) return prev;
      return [
        ...prev,
        { classId, dateISO, memberEmail, createdAt: new Date().toISOString() },
      ];
    });
  }
}
