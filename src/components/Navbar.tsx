import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const navItems = [
    { href: "/inicio", label: "Inicio" },
    { href: "/ofrecimiento", label: "Ofrecimiento" },
    { href: "/recursos", label: "Recursos" },
    { href: "/intercambio", label: "Intercambio" },
    { href: "/conocimientos", label: "Conocimientos" },
  ];

  return (
    <nav className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/inicio" 
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
          >
            TRUEKE
          </Link>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}