"use client";

import { useState, useEffect } from "react";
import { ResourceWithOwner } from "@/lib/types";
import ResourceCard from "@/components/ResourceCard";
import NewResourceForm from "@/components/forms/NewResourceForm";
import { Plus, Package } from "lucide-react";

export default function RecursosPage() {
  const [resources, setResources] = useState<ResourceWithOwner[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await fetch("/api/resources");
      if (response.ok) {
        const data = await response.json();
        setResources(data);
      }
    } catch (error) {
      console.error("Error fetching resources:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    fetchResources();
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mb-6">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Fase 2: Reunión de Recursos
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Bienes y servicios disponibles para intercambio. Aquí las comunidades 
            comparten lo que pueden ofrecer para el beneficio mutuo.
          </p>
          
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Nuevo Recurso</span>
          </button>
        </div>

        {/* Formulario */}
        {showForm && (
          <div className="max-w-md mx-auto mb-12">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Agregar Nuevo Recurso
              </h3>
              <NewResourceForm onSuccess={handleFormSuccess} />
              <button
                onClick={() => setShowForm(false)}
                className="w-full mt-4 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Grid de Recursos */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Recursos Disponibles
          </h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 dark:text-gray-300 mt-4">Cargando recursos...</p>
            </div>
          ) : resources.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No hay recursos disponibles
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Agrega el primer recurso para comenzar los intercambios.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary inline-flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Agregar Primer Recurso</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}