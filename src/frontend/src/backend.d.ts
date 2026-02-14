import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface ReminderSettings {
    dailyReminderTime?: string;
}
export interface ApplicationLogEntry {
    role: string;
    company: string;
    notes?: string;
    timestamp: Time;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerReminderSettings(): Promise<ReminderSettings | null>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getRecentApplicationEntries(): Promise<Array<ApplicationLogEntry>>;
    getReminderSettings(user: Principal): Promise<ReminderSettings | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    logApplicationEntry(company: string, role: string, notes: string | null): Promise<void>;
    saveCallerReminderSettings(settings: ReminderSettings): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateReminderSettings(user: Principal, settings: ReminderSettings): Promise<void>;
}
