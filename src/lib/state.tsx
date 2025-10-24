"use client";
import React, { createContext, useContext, useMemo, useState } from "react";
import type { Event, Registration, Role, User } from "@/lib/types";

type State = {
  user: User | null;
  role: Role;
  events: Event[];
  registrations: Registration[];
  login: (email: string, role: Exclude<Role, null>) => void;
  register: (name: string, email: string, role: Exclude<Role, null>) => void;
  logout: () => void;
  createEvent: (e: Omit<Event, "id" | "status" | "createdBy">) => string;
  approveEvent: (eventId: string) => void;
  registerEvent: (
    eventId: string,
    data: Pick<Registration, "userName" | "userEmail" | "nim">
  ) => string; // ticket code
};

const AppContext = createContext<State | undefined>(undefined);

function id(prefix = "id"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function ticketCode(eventId: string, email: string) {
  let base = email;
  try {
    // Prefer browser btoa if available
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const toBase64 = (globalThis as any).btoa as ((s: string) => string) | undefined;
    base = toBase64 ? toBase64(email) : email;
  } catch {
    // fallback to simple hash
    let h = 0;
    for (let i = 0; i < email.length; i++) h = (h * 31 + email.charCodeAt(i)) >>> 0;
    base = h.toString(36);
  }
  return `TKT-${eventId.slice(-4)}-${base.slice(0, 6).toUpperCase()}`;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<Event[]>([{
    id: id("evt"),
    title: "Kompetisi Keinformatikaan Teknik Inormatika",
    description: "Kompetisi Beberapa Cabang Di bidang Keinformatikaan Fakultas Teknik UNISMUH Makassar",
    date: new Date(Date.now() + 86400000).toISOString(),
    location: "Aula Teknik UNISMUH Makassar",
    createdBy: "seed",
    status: "APPROVED",
    capacity: 100
  }]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  const value = useMemo<State>(
    () => ({
      user,
      role: user?.role ?? null,
      events,
      registrations,
      login: (email, role) => {
        const u: User = {
          id: id("usr"),
          name: email.split("@")[0],
          email,
          role,
          token: id("token"),
        };
        setUser(u);
      },
      register: (name, email, role) => {
        const u: User = { id: id("usr"), name, email, role, token: id("token") };
        setUser(u);
      },
      logout: () => setUser(null),
      createEvent: (e) => {
        const newId = id("evt");
        setEvents((prev) => [
          ...prev,
          {
            id: newId,
            title: e.title,
            description: e.description,
            date: e.date,
            location: e.location,
            capacity: e.capacity,
            createdBy: user?.id ?? "anon",
            status: "PENDING",
          },
        ]);
        return newId;
      },
      approveEvent: (eventId) => {
        setEvents((prev) => prev.map((ev) => (ev.id === eventId ? { ...ev, status: "APPROVED" } : ev)));
      },
      registerEvent: (eventId, data) => {
        const t = ticketCode(eventId, data.userEmail);
        const reg: Registration = {
          id: id("reg"),
          eventId,
          userName: data.userName,
          userEmail: data.userEmail,
          nim: data.nim,
          ticketCode: t,
          createdAt: new Date().toISOString(),
        };
        setRegistrations((prev) => [...prev, reg]);
        return t;
      },
    }),
    [user, events, registrations]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
