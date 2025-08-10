"use client";

import { useState, useEffect } from "react";
import { Community } from "@/lib/schema";
import CommunityCard from "@/components/CommunityCard";
import NewCommunityForm from "@/components/forms/NewCommunityForm";
import { Plus, Users } from "lucide-react";

export default function OfrecimientoPage() {
  const [communities, setCommunities] = useState<Community[]>([]);
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-6">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Fase 1: Ofrecimiento
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Presentación de comunidades con sus orígenes, intereses y propósitos. 
            Aquí cada grupo comparte su esencia y valores fundamentales.
          </p>
          
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Nueva Comunidad</span>
          </button>
        </div>

        {/* Formulario */}
        {showForm && (
          <div className="max-w-md mx-auto mb-12">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Crear Nueva Comunidad
              </h3>
              <NewCommunityForm onSuccess={handleFormSuccess} />
              <button
                onClick={() => setShowForm(false)}
                className="w-full mt-4 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Lista de Comunidades */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Comunidades en TRUEKE
          </h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
              <p className="text-gray-600 dark:text-gray-300 mt-4">Cargando comunidades...</p>
            </div>
          ) : communities.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communities.map((community) => (
                <CommunityCard key={community.id} community={community} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No hay comunidades aún
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
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
          )}
        </div>
      </div>
    </div>
  );
}