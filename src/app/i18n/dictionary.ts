import type { Discipline, Level } from "../data/types";

export interface StatItem {
  value: string;
  label: string;
}

export interface ProgramItem {
  name: string;
  tagline: string;
  description: string;
}

export interface PricingTierItem {
  name: string;
  price: string;
  period: string;
  features: string[];
  highlighted: boolean;
}

export interface AppDictionary {
  nav: {
    home: string;
    schedule: string;
    programs: string;
    pricing: string;
    contact: string;
    myBookings: string;
    hi: string;
    signIn: string;
    signOut: string;
    bookClass: string;
  };
  footer: {
    tagline: string;
    explore: string;
    home: string;
    weeklySchedule: string;
    programs: string;
    pricing: string;
    visitUs: string;
    openingHours: string;
    monFri: string;
    saturday: string;
    sunday: string;
    rightsReserved: string;
    builtFor: string;
  };
  memberModal: {
    badge: string;
    title: string;
    subtitle: string;
    fullName: string;
    email: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    errorRequired: string;
    errorEmail: string;
    cancel: string;
    continue: string;
  };
  classRow: {
    classEnded: string;
    fullyBooked: string;
    spotLeftOne: string;
    spotLeftMany: string;
    reserved: string;
    full: string;
    reserve: string;
  };
  schedule: {
    thisWeek: string;
    nextWeek: string;
    title: string;
    subtitle: string;
    allFilter: string;
    noClassesTemplate: string;
    weekdaysShort: [string, string, string, string, string, string, string];
    weekdaysLong: [string, string, string, string, string, string, string];
  };
  disciplines: Record<Discipline, string>;
  levels: Record<Level, string>;
  myBookings: {
    badge: string;
    signInTitle: string;
    signInSubtitle: string;
    signInButton: string;
    welcomeTemplate: string;
    subtitle: string;
    emptyText: string;
    browseSchedule: string;
    cancel: string;
    completed: string;
  };
  notFound: {
    title: string;
    subtitle: string;
    backHome: string;
  };
  home: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    ctaSchedule: string;
    ctaPricing: string;
    stats: StatItem[];
    programsBadge: string;
    programsTitle: string;
    programsSubtitle: string;
    programs: ProgramItem[];
    todayBadge: string;
    todayTitle: string;
    viewFullWeek: string;
    reserveSpot: string;
    pricingBadge: string;
    pricingTitle: string;
    pricingSubtitle: string;
    pricingTiers: PricingTierItem[];
    mostPopular: string;
    getStarted: string;
    ctaBannerTitle: string;
    ctaBannerSubtitle: string;
    ctaBannerButton: string;
  };
}
