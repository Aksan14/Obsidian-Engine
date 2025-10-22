export type Role = "ADMIN" | "PENGURUS" | "MAHASISWA" | null;

export type User = {
  id: string;
  name: string;
  email: string;
  role: Exclude<Role, null>;
  token: string;
};

export type Event = {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date string
  location: string;
  createdBy: string; // user id
  status: "PENDING" | "APPROVED" | "REJECTED";
  capacity?: number;
};

export type Registration = {
  id: string;
  eventId: string;
  userName: string;
  userEmail: string;
  nim?: string;
  ticketCode: string; // used for QR
  createdAt: string;
};
