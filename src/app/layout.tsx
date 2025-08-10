import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });

export const metadata: Metadata = {
  title: "TRUEKE - Intercambio Consciente",
  description: "Plataforma de intercambio basada en las 5 fases del trafkintun",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="dark">
      <body className={`${inter.className} ${orbitron.variable} bg-black text-white min-h-screen`}>
        <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px),
                                 radial-gradient(circle at 75% 75%, rgba(6,182,212,0.1) 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
              }}
            />
          </div>
          
          <Navbar />
          <main className="relative z-10">
            {children}
          </main>
          
          {/* Footer glow */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
        </div>
      </body>
    </html>
  );
}
