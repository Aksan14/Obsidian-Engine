"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/lib/state";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-black via-gray-900 to-black backdrop-blur-md border-b border-red-600/20 shadow-2xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="group flex-shrink-0 relative">
            <div className="flex items-center">
              <div className="relative w-[180px] h-[45px] transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/y.png"
                  alt="Obsidian Engine"
                  fill
                  className="object-contain brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
                  style={{
                    filter: 'brightness(0) saturate(100%) invert(27%) sepia(98%) saturate(7466%) hue-rotate(357deg) brightness(99%) contrast(113%)'
                  }}
                  priority
                />
              </div>
            </div>
            {/* Underline animation */}
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-red-500 group-hover:w-full transition-all duration-300"></div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className={`relative px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 group ${
                isActive("/")
                  ? "text-white bg-gradient-to-r from-red-600 to-red-700 shadow-lg shadow-red-600/40"
                  : "text-gray-300 hover:text-white hover:bg-gray-800/60"
              }`}
            >
              Beranda
              {!isActive("/") && (
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              )}
            </Link>

            <Link
              href="/events"
              className={`relative px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 group ${
                isActive("/events")
                  ? "text-white bg-gradient-to-r from-red-600 to-red-700 shadow-lg shadow-red-600/40"
                  : "text-gray-300 hover:text-white hover:bg-gray-800/60"
              }`}
            >
              Event
              {!isActive("/events") && (
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              )}
            </Link>

            <Link
              href="/tickets"
              className={`relative px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 group ${
                isActive("/tickets")
                  ? "text-white bg-gradient-to-r from-red-600 to-red-700 shadow-lg shadow-red-600/40"
                  : "text-gray-300 hover:text-white hover:bg-gray-800/60"
              }`}
            >
              Tiket
              {!isActive("/tickets") && (
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              )}
            </Link>

            <Link
              href="/about"
              className={`relative px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 group ${
                isActive("/about")
                  ? "text-white bg-gradient-to-r from-red-600 to-red-700 shadow-lg shadow-red-600/40"
                  : "text-gray-300 hover:text-white hover:bg-gray-800/60"
              }`}
            >
              Tentang
              {!isActive("/about") && (
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              )}
            </Link>

            <Link
              href="/contact"
              className={`relative px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 group ${
                isActive("/contact")
                  ? "text-white bg-gradient-to-r from-red-600 to-red-700 shadow-lg shadow-red-600/40"
                  : "text-gray-300 hover:text-white hover:bg-gray-800/60"
              }`}
            >
              Kontak
              {!isActive("/contact") && (
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              )}
            </Link>

            {user?.role === "PENGURUS" && (
              <Link
                href="/pengurus/dashboard"
                className={`relative px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${
                  pathname.startsWith("/pengurus")
                    ? "text-white bg-gradient-to-r from-red-600 to-red-700 shadow-lg shadow-red-600/40"
                    : "text-gray-300 hover:text-white hover:bg-gray-800/60"
                }`}
              >
                Dashboard
              </Link>
            )}

            {user?.role === "ADMIN" && (
              <Link
                href="/admin/dashboard"
                className={`relative px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${
                  pathname.startsWith("/admin")
                    ? "text-white bg-gradient-to-r from-red-600 to-red-700 shadow-lg shadow-red-600/40"
                    : "text-gray-300 hover:text-white hover:bg-gray-800/60"
                }`}
              >
                Admin Panel
              </Link>
            )}

            {user?.role === "MAHASISWA" && (
              <Link
                href="/mahasiswa/dashboard"
                className={`relative px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${
                  pathname.startsWith("/mahasiswa")
                    ? "text-white bg-gradient-to-r from-red-600 to-red-700 shadow-lg shadow-red-600/40"
                    : "text-gray-300 hover:text-white hover:bg-gray-800/60"
                }`}
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3 bg-gradient-to-r from-gray-800/80 to-gray-800/60 px-4 py-2.5 rounded-xl border border-gray-700/50 backdrop-blur-sm hover:border-red-600/50 transition-all duration-300 group">
                  <div className="w-11 h-11 bg-gradient-to-br from-red-600 via-red-500 to-red-700 rounded-lg flex items-center justify-center text-white font-bold text-base shadow-lg shadow-red-600/30 group-hover:scale-110 transition-transform duration-300">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white leading-tight">
                      {user.name}
                    </span>
                    <span className="text-xs text-gray-400 capitalize font-medium">
                      {user.role.toLowerCase()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-red-600 to-red-700 rounded-xl hover:from-red-700 hover:to-red-800 border border-red-500/50 shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all duration-300 hover:scale-105"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="px-7 py-2.5 text-sm font-bold bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all duration-300 hover:scale-105"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="px-7 py-2.5 text-sm font-bold text-white border-2 border-gray-600 rounded-xl hover:border-red-600 hover:bg-red-600/10 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-all duration-200"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-red-600/20 bg-gradient-to-b from-black to-gray-900 backdrop-blur-lg shadow-xl">
          <div className="px-4 py-6 space-y-2">
            {/* User Info Mobile */}
            {user && (
              <div className="flex items-center gap-3 bg-gradient-to-r from-gray-800/80 to-gray-800/60 px-4 py-3.5 rounded-xl border border-gray-700/50 mb-4 backdrop-blur-sm">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 via-red-500 to-red-700 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-red-600/30">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white">
                    {user.name}
                  </span>
                  <span className="text-xs text-gray-400 capitalize font-medium">
                    {user.role.toLowerCase()}
                  </span>
                </div>
              </div>
            )}

            {/* Navigation Links Mobile */}
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3.5 text-sm font-bold rounded-xl transition-all duration-200 ${
                isActive("/")
                  ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/30"
                  : "text-gray-300 hover:bg-gray-800/60 hover:text-white"
              }`}
            >
              Beranda
            </Link>

            <Link
              href="/events"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3.5 text-sm font-bold rounded-xl transition-all duration-200 ${
                isActive("/events")
                  ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/30"
                  : "text-gray-300 hover:bg-gray-800/60 hover:text-white"
              }`}
            >
              Event
            </Link>

            <Link
              href="/tickets"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3.5 text-sm font-bold rounded-xl transition-all duration-200 ${
                isActive("/tickets")
                  ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/30"
                  : "text-gray-300 hover:bg-gray-800/60 hover:text-white"
              }`}
            >
              Tiket
            </Link>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3.5 text-sm font-bold rounded-xl transition-all duration-200 ${
                isActive("/about")
                  ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/30"
                  : "text-gray-300 hover:bg-gray-800/60 hover:text-white"
              }`}
            >
              Tentang
            </Link>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3.5 text-sm font-bold rounded-xl transition-all duration-200 ${
                isActive("/contact")
                  ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/30"
                  : "text-gray-300 hover:bg-gray-800/60 hover:text-white"
              }`}
            >
              Kontak
            </Link>

            {user?.role === "PENGURUS" && (
              <Link
                href="/pengurus/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3.5 text-sm font-bold rounded-xl transition-all duration-200 ${
                  pathname.startsWith("/pengurus")
                    ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/30"
                    : "text-gray-300 hover:bg-gray-800/60 hover:text-white"
                }`}
              >
                Dashboard
              </Link>
            )}

            {user?.role === "ADMIN" && (
              <Link
                href="/admin/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3.5 text-sm font-bold rounded-xl transition-all duration-200 ${
                  pathname.startsWith("/admin")
                    ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/30"
                    : "text-gray-300 hover:bg-gray-800/60 hover:text-white"
                }`}
              >
                Admin Panel
              </Link>
            )}

            {user?.role === "MAHASISWA" && (
              <Link
                href="/mahasiswa/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3.5 text-sm font-bold rounded-xl transition-all duration-200 ${
                  pathname.startsWith("/mahasiswa")
                    ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/30"
                    : "text-gray-300 hover:bg-gray-800/60 hover:text-white"
                }`}
              >
                Dashboard
              </Link>
            )}

            {/* Auth Buttons Mobile */}
            <div className="pt-4 border-t border-red-600/20 space-y-2 mt-4">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-red-600 to-red-700 rounded-xl hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-600/30 transition-all duration-300"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full px-4 py-3.5 text-sm font-bold bg-gradient-to-r from-red-600 to-red-700 text-white text-center rounded-xl hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-600/30 transition-all duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full px-4 py-3.5 text-sm font-bold text-white border-2 border-gray-600 text-center rounded-xl hover:border-red-600 hover:bg-red-600/10 backdrop-blur-sm transition-all duration-300"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
