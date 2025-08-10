import Link from "next/link";
import { ArrowRight, Heart, Users, Repeat, BookOpen, Star } from "lucide-react";

export default function InicioPage() {
  const fases = [
    {
      fase: 1,
      nombre: "Ofrecimiento",
      descripcion: "Presentación de comunidades con sus orígenes, intereses y propósitos",
      icono: <Users className="w-8 h-8" />,
      href: "/ofrecimiento",
      color: "from-purple-500 to-blue-500"
    },
    {
      fase: 2,
      nombre: "Recursos",
      descripcion: "Reunión de bienes y servicios disponibles para intercambio",
      icono: <Heart className="w-8 h-8" />,
      href: "/recursos",
      color: "from-blue-500 to-teal-500"
    },
    {
      fase: 3,
      nombre: "Intercambio",
      descripcion: "Negociación, propuesta y acuerdo entre comunidades",
      icono: <Repeat className="w-8 h-8" />,
      href: "/intercambio",
      color: "from-teal-500 to-green-500"
    },
    {
      fase: 4,
      nombre: "Conocimientos",
      descripcion: "Compartir ideas y experiencias que fortalecen los lazos",
      icono: <BookOpen className="w-8 h-8" />,
      href: "/conocimientos",
      color: "from-green-500 to-yellow-500"
    },
  ];

  return (
    <div className="min-h-screen gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mb-6">
              <Star className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Bienvenido a <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">TRUEKE</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Una plataforma de intercambio consciente basada en las 5 fases del trafkintun, 
              donde comunidades se encuentran para compartir recursos, conocimientos y crear lazos duraderos.
            </p>
          </div>
          
          <Link 
            href="/ofrecimiento"
            className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-4"
          >
            <span>Comenzar el Encuentro</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Fases del Flujo */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Las Fases del Intercambio Consciente
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {fases.map((fase) => (
              <Link
                key={fase.fase}
                href={fase.href}
                className="group block"
              >
                <div className="card hover:scale-105 transition-transform">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${fase.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                    {fase.icono}
                  </div>
                  
                  <div className="flex items-center mb-2">
                    <span className="text-sm font-bold text-gray-500 dark:text-gray-400 mr-2">
                      FASE {fase.fase}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {fase.nombre}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {fase.descripcion}
                  </p>
                  
                  <div className="mt-4 flex items-center text-purple-600 dark:text-purple-400 text-sm font-medium group-hover:text-purple-700 dark:group-hover:text-purple-300">
                    <span>Explorar</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Filosofía Yin-Yang */}
        <div className="card max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-6">
            <svg viewBox="0 0 64 64" className="w-full h-full">
              <circle cx="32" cy="32" r="30" fill="currentColor" className="text-gray-900 dark:text-white" />
              <path
                d="M32 2 A30 30 0 0 1 32 62 A15 15 0 0 1 32 32 A15 15 0 0 0 32 2"
                fill="currentColor"
                className="text-gray-100 dark:text-gray-700"
              />
              <circle cx="32" cy="17" r="5" fill="currentColor" className="text-gray-900 dark:text-white" />
              <circle cx="32" cy="47" r="5" fill="currentColor" className="text-gray-100 dark:text-gray-700" />
            </svg>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Equilibrio y Armonía
          </h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            TRUEKE se inspira en la filosofía del yin-yang, buscando el equilibrio entre dar y recibir, 
            entre lo material y lo espiritual, entre comunidades diversas que se complementan 
            para crear un intercambio verdaderamente consciente.
          </p>
        </div>
      </div>
    </div>
  );
}