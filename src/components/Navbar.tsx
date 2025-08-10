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
    <nav className="glass-nav sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/inicio" 
            className="text-3xl font-bold font-['Orbitron'] text-glow electric-pulse"
            style={{
              background: 'linear-gradient(45deg, #ffffff 0%, #06b6d4 50%, #ffffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            TRUEKE
          </Link>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/80 hover:text-white hover:text-glow font-medium relative group transition-all duration-300"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-white to-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="hidden md:block w-px h-6 bg-white/20"></div>
            <div className="w-3 h-3 rounded-full bg-cyan-400 electric-pulse shadow-lg shadow-cyan-400/50"></div>
          </div>
        </div>
      </div>
    </nav>
  );
}