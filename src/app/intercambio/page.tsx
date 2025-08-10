"use client";

import { useState, useEffect } from "react";
import type { OfferDTO, ResourceDTO } from "@/lib/types";
import OfferCard from "@/components/OfferCard";
import { Plus, Repeat, ArrowRightLeft } from "lucide-react";

export default function IntercambioPage() {
  const [offers, setOffers] = useState<OfferDTO[]>([]);
  const [resources, setResources] = useState<ResourceDTO[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fromId: "",
    toId: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchOffers();
    fetchResources();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await fetch("/api/offers");
      if (response.ok) {
        const data = await response.json();
        setOffers(data);
      }
    } catch (error) {
      console.error("Error fetching offers:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchResources = async () => {
    try {
      const response = await fetch("/api/resources");
      if (response.ok) {
        const data = await response.json();
        setResources(data);
      }
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fromId || !formData.toId || formData.fromId === formData.toId) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ fromId: "", toId: "" });
        setShowForm(false);
        fetchOffers();
      }
    } catch (error) {
      console.error("Error creating offer:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-teal-500 to-green-500 rounded-full flex items-center justify-center mb-6">
            <Repeat className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Intercambio
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Fase 4: Negociación, propuesta y acuerdo. Conecta recursos y crea nuevas relaciones de intercambio.
          </p>
        </div>

        {/* Action Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-xl hover:from-teal-600 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            Crear Oferta de Intercambio
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="max-w-2xl mx-auto mb-8 card">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Nueva Oferta de Intercambio
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Recurso que ofreces
                  </label>
                  <select
                    value={formData.fromId}
                    onChange={(e) => setFormData({ ...formData, fromId: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    required
                  >
                    <option value="">Selecciona un recurso</option>
                    {resources.map((resource) => (
                      <option key={resource.id} value={resource.id}>
                        {resource.title} - {resource.owner.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Recurso que solicitas
                  </label>
                  <select
                    value={formData.toId}
                    onChange={(e) => setFormData({ ...formData, toId: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    required
                  >
                    <option value="">Selecciona un recurso</option>
                    {resources
                      .filter((resource) => resource.id !== formData.fromId)
                      .map((resource) => (
                        <option key={resource.id} value={resource.id}>
                          {resource.title} - {resource.owner.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <ArrowRightLeft className="w-6 h-6 text-teal-500" />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.fromId || !formData.toId || formData.fromId === formData.toId}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-xl hover:from-teal-600 hover:to-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isSubmitting ? "Creando..." : "Crear Oferta"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Offers List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Ofertas Activas
          </h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
              <p className="text-gray-600 dark:text-gray-400 mt-4">Cargando ofertas...</p>
            </div>
          ) : offers.length === 0 ? (
            <div className="text-center py-12 card">
              <ArrowRightLeft className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                No hay ofertas disponibles
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Sé el primero en crear una oferta de intercambio.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {offers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}