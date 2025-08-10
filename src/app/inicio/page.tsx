import Link from "next/link";
import { ArrowRight, Heart, Users, Repeat, BookOpen, Star, Zap } from "lucide-react";

export default function InicioPage() {
  const fases = [
    {
      fase: 1,
      nombre: "Ofrecimiento",
      descripcion: "Presentación de comunidades con sus orígenes, intereses y propósitos",
      icono: <Users className="w-8 h-8" />,
      href: "/ofrecimiento",
      color: "from-white to-cyan-400"
    },
    {
      fase: 2,
      nombre: "Recursos",
      descripcion: "Reunión de bienes y servicios disponibles para intercambio",
      icono: <Heart className="w-8 h-8" />,
      href: "/recursos",
      color: "from-cyan-400 to-white"
    },
    {
      fase: 3,
      nombre: "Intercambio",
      descripcion: "Negociación, propuesta y acuerdo entre comunidades",
      icono: <Repeat className="w-8 h-8" />,
      href: "/intercambio",
      color: "from-white to-cyan-400"
    },
    {
      fase: 4,
      nombre: "Conocimientos",
      descripcion: "Compartir ideas y experiencias que fortalecen los lazos",
      icono: <BookOpen className="w-8 h-8" />,
      href: "/conocimientos",
      color: "from-cyan-400 to-white"
    },
  ];

  return (
    <div className="min-h-screen gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto bg-black border-2 border-white/30 rounded-full flex items-center justify-center mb-8 relative overflow-hidden group">
              <Star className="w-16 h-16 text-white icon-neon electric-pulse" />
              
              {/* Yin-Yang Background Effect */}
              <div className="absolute inset-0 opacity-20">
                <div className="w-16 h-32 bg-white rounded-l-full"></div>
                <div className="w-16 h-32 bg-black rounded-r-full transform -translate-y-32 translate-x-16"></div>
                <div className="absolute top-8 left-8 w-4 h-4 bg-black rounded-full"></div>
                <div className="absolute bottom-8 right-8 w-4 h-4 bg-white rounded-full"></div>
              </div>
              
              {/* Rotating glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-spin" style={{animationDuration: '8s'}}></div>
            </div>
            
            <h1 className="text-6xl font-bold font-['Orbitron'] text-white mb-6">
              Bienvenido a{" "}
              <span 
                className="text-glow electric-pulse"
                style={{
                  background: 'linear-gradient(45deg, #ffffff 0%, #06b6d4 50%, #ffffff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                TRUEKE
              </span>
            </h1>
            
            <p className="text-xl text-white/80 max-w-4xl mx-auto mb-8 leading-relaxed">
              Una plataforma de intercambio consciente basada en las 5 fases del trafkintun, 
              donde comunidades se encuentran para compartir recursos, conocimientos y crear lazos duraderos 
              en el equilibrio perfecto del universo digital.
            </p>
          </div>
          
          <Link 
            href="/ofrecimiento"
            className="btn-primary inline-flex items-center space-x-3 text-lg px-10 py-4 font-['Orbitron'] font-medium"
          >
            <Zap className="w-6 h-6" />
            <span>Comenzar el Encuentro</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>

        {/* Fases del Flujo */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold font-['Orbitron'] text-center text-white text-glow mb-12">
            Las Fases del Intercambio Consciente
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {fases.map((fase) => (
              <Link
                key={fase.fase}
                href={fase.href}
                className="group block"
              >
                <div className="card-futuristic hover:scale-105 transition-all duration-500">
                  <div className="relative">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${fase.color} flex items-center justify-center text-black mb-6 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden`}>
                      <div className="relative z-10">
                        {fase.icono}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-3">
                    <span className="text-sm font-bold font-['Orbitron'] text-cyan-400 mr-3">
                      FASE {fase.fase}
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-cyan-400 to-transparent"></div>
                  </div>
                  
                  <h3 className="text-xl font-bold font-['Orbitron'] text-white mb-4">
                    {fase.nombre}
                  </h3>
                  
                  <p className="text-white/70 text-sm leading-relaxed mb-4">
                    {fase.descripcion}
                  </p>
                  
                  <div className="flex items-center text-cyan-400 text-sm font-medium group-hover:text-white transition-colors">
                    <span>Explorar</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Filosofía Yin-Yang */}
        <div className="card-futuristic max-w-5xl mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-8 relative">
            {/* Yin-Yang Symbol */}
            <div className="w-24 h-24 rounded-full bg-white relative overflow-hidden electric-pulse">
              <div className="w-12 h-24 bg-black rounded-l-full"></div>
              <div className="w-12 h-24 bg-white rounded-r-full transform -translate-y-24 translate-x-12"></div>
              <div className="absolute top-6 left-6 w-6 h-6 bg-black rounded-full"></div>
              <div className="absolute bottom-6 right-6 w-6 h-6 bg-white rounded-full"></div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 via-white/30 to-cyan-400/20 animate-pulse"></div>
            </div>
          </div>
          
          <h3 className="text-3xl font-bold font-['Orbitron'] text-white text-glow mb-6">
            Equilibrio y Armonía Digital
          </h3>
          <p className="text-white/80 max-w-3xl mx-auto text-lg leading-relaxed">
            TRUEKE se inspira en la filosofía del yin-yang, buscando el equilibrio entre dar y recibir, 
            entre lo material y lo espiritual, entre comunidades diversas que se complementan 
            para crear un intercambio verdaderamente consciente en la era digital.
          </p>
          
          <div className="mt-8 flex justify-center">
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 rounded-full bg-white electric-pulse"></div>
              <div className="w-px h-8 bg-gradient-to-b from-white via-cyan-400 to-white"></div>
              <div className="w-3 h-3 rounded-full bg-cyan-400 electric-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}