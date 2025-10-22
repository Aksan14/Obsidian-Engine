import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-red-600/20 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="group inline-block mb-4">
              <div className="relative w-[180px] h-[45px] transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/y.png"
                  alt="Obsidian Engine"
                  fill
                  className="object-contain"
                  style={{
                    filter: 'brightness(0) saturate(100%) invert(27%) sepia(98%) saturate(7466%) hue-rotate(357deg) brightness(99%) contrast(113%)'
                  }}
                />
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-4 max-w-md">
              Satu pintu untuk event lembaga kampus: kelola, setujui, dan daftar event secara terpusat dengan sistem tiket digital berbasis QR.
            </p>
            <div className="flex gap-3">
              <a 
                href="mailto:info@obsidianengine.com" 
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 hover:from-red-600 hover:to-red-700 border border-gray-700/50 hover:border-red-600 flex items-center justify-center transition-all duration-300 group shadow-lg hover:shadow-red-600/30"
              >
                <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 hover:from-red-600 hover:to-red-700 border border-gray-700/50 hover:border-red-600 flex items-center justify-center transition-all duration-300 group shadow-lg hover:shadow-red-600/30"
              >
                <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 hover:from-red-600 hover:to-red-700 border border-gray-700/50 hover:border-red-600 flex items-center justify-center transition-all duration-300 group shadow-lg hover:shadow-red-600/30"
              >
                <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div>
            <div className="font-black mb-4 text-sm uppercase tracking-wide text-white">
              Navigasi
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link 
                  className="text-gray-400 hover:text-red-500 hover:translate-x-1 inline-flex items-center gap-2 transition-all group" 
                  href="/events"
                >
                  <span className="text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Event
                </Link>
              </li>
              <li>
                <Link 
                  className="text-gray-400 hover:text-red-500 hover:translate-x-1 inline-flex items-center gap-2 transition-all group" 
                  href="/tickets"
                >
                  <span className="text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Tiket
                </Link>
              </li>
              <li>
                <Link 
                  className="text-gray-400 hover:text-red-500 hover:translate-x-1 inline-flex items-center gap-2 transition-all group" 
                  href="/about"
                >
                  <span className="text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Tentang
                </Link>
              </li>
              <li>
                <Link 
                  className="text-gray-400 hover:text-red-500 hover:translate-x-1 inline-flex items-center gap-2 transition-all group" 
                  href="/contact"
                >
                  <span className="text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Kontak
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Account Links */}
          <div>
            <div className="font-black mb-4 text-sm uppercase tracking-wide text-white">
              Akun
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link 
                  className="text-gray-400 hover:text-red-500 hover:translate-x-1 inline-flex items-center gap-2 transition-all group" 
                  href="/auth/login"
                >
                  <span className="text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Login
                </Link>
              </li>
              <li>
                <Link 
                  className="text-gray-400 hover:text-red-500 hover:translate-x-1 inline-flex items-center gap-2 transition-all group" 
                  href="/auth/register"
                >
                  <span className="text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Registrasi
                </Link>
              </li>
              <li>
                <Link 
                  className="text-gray-400 hover:text-red-500 hover:translate-x-1 inline-flex items-center gap-2 transition-all group" 
                  href="/auth/reset"
                >
                  <span className="text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Reset Password
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-red-600/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <div className="font-medium">
            © {new Date().getFullYear()} <span className="text-white font-bold">OBSIDIAN ENGINE</span>. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-red-500 transition-colors font-medium">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-red-500 transition-colors font-medium">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
