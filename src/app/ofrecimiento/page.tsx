"use client";

import { useState, useEffect } from "react";
import type { CommunityDTO } from "@/lib/types";
import CommunityCard from "@/components/CommunityCard";
import NewCommunityForm from "@/components/forms/NewCommunityForm";
import { Plus, Users, Zap } from "lucide-react";

export default function OfrecimientoPage() {
  const [communities, setCommunities] = useState<CommunityDTO[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    try {
      const response = await fetch("/api/communities");
      if (response.ok) {
        const data = await response.json();
        setCommunities(data);
      }
    } catch (error) {
      console.error("Error fetching communities:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    fetchCommunities();
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto bg-black border-2 border-cyan-400/60 rounded-full flex items-center justify-center mb-8 relative overflow-hidden">
            <Users className="w-10 h-10 text-cyan-400 icon-neon electric-pulse" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent animate-spin" style={{animationDuration: '6s'}}></div>
          </div>
          
          <h1 className="text-5xl font-bold font-['Orbitron'] text-white text-glow mb-6">
            Fase 1: Ofrecimiento
          </h1>
          <p className="text-xl text-white/80 max-w-4xl mx-auto mb-8 leading-relaxed">
            Presentación de comunidades con sus orígenes, intereses y propósitos. 
            Aquí cada grupo comparte su esencia y valores fundamentales en el equilibrio digital.
          </p>
          
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary inline-flex items-center space-x-3 font-['Orbitron'] font-medium"
          >
            <Plus className="w-5 h-5" />
            <span>Nueva Comunidad</span>
            <Zap className="w-5 h-5" />
          </button>
        </div>

        {/* Formulario */}
        {showForm && (
          <div className="max-w-md mx-auto mb-12">
            <div className="card-futuristic">
              <h3 className="text-xl font-semibold font-['Orbitron'] text-white text-glow mb-6">
                Crear Nueva Comunidad
              </h3>
              <NewCommunityForm onSuccess={handleFormSuccess} />
              <button
                onClick={() => setShowForm(false)}
                className="btn-secondary w-full mt-4"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Lista de Comunidades */}
        <div>
          <h2 className="text-3xl font-bold font-['Orbitron'] text-white text-glow mb-8 text-center">
            Comunidades en TRUEKE
          </h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 relative">
                <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-cyan-400 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <p className="text-white/70 font-['Orbitron']">Sincronizando comunidades...</p>
            </div>
          ) : communities.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {communities.map((community) => (
                <CommunityCard key={community.id} community={community} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="card-futuristic max-w-md mx-auto">
                <Users className="w-20 h-20 text-cyan-400 mx-auto mb-6 icon-neon" />
                <h3 className="text-xl font-medium font-['Orbitron'] text-white mb-4">
                  No hay comunidades aún
                </h3>
                <p className="text-white/70 mb-8">
                  Sé el primero en crear una comunidad y comenzar el intercambio consciente.
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Crear Primera Comunidad</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}