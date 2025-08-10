"use client";

import { useState, useEffect } from "react";
import { createResourceSchema } from "@/lib/validators";
import { Community } from "@/lib/schema";

interface NewResourceFormProps {
  onSuccess: () => void;
}

export default function NewResourceForm({ onSuccess }: NewResourceFormProps) {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [formData, setFormData] = useState({
    ownerId: "",
    title: "",
    description: "",
    image: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const validatedData = createResourceSchema.parse(formData);
      
      const response = await fetch("/api/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al crear el recurso");
      }

      setFormData({ ownerId: "", title: "", description: "", image: "" });
      onSuccess();
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'errors' in error) {
        const newErrors: Record<string, string> = {};
        (error.errors as { path: string[]; message: string }[]).forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      } else {
        setErrors({ general: error instanceof Error ? error.message : 'Error desconocido' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Comunidad propietaria
        </label>
        <select
          value={formData.ownerId}
          onChange={(e) => setFormData({ ...formData, ownerId: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="">Selecciona una comunidad</option>
          {communities.map((community) => (
            <option key={community.id} value={community.id}>
              {community.name}
            </option>
          ))}
        </select>
        {errors.ownerId && <p className="text-red-500 text-xs mt-1">{errors.ownerId}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Título del recurso
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="Título de tu recurso"
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Descripción
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="Describe tu recurso..."
        />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Imagen (opcional)
        </label>
        <input
          type="url"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="https://ejemplo.com/imagen.jpg"
        />
        {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
      </div>

      {errors.general && (
        <p className="text-red-500 text-sm">{errors.general}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting || !formData.ownerId}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? "Creando..." : "Crear Recurso"}
      </button>
    </form>
  );
}