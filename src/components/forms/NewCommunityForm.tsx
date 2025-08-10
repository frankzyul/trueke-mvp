"use client";

import { useState } from "react";
import { createCommunitySchema } from "@/lib/validators";

interface NewCommunityFormProps {
  onSuccess: () => void;
}

export default function NewCommunityForm({ onSuccess }: NewCommunityFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    avatar: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const validatedData = createCommunitySchema.parse(formData);
      
      const response = await fetch("/api/communities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al crear la comunidad");
      }

      setFormData({ name: "", description: "", avatar: "" });
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
          Nombre de la comunidad
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="Nombre de tu comunidad"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
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
          placeholder="Describe tu comunidad..."
        />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Avatar (opcional)
        </label>
        <input
          type="url"
          value={formData.avatar}
          onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="https://ejemplo.com/avatar.jpg"
        />
        {errors.avatar && <p className="text-red-500 text-xs mt-1">{errors.avatar}</p>}
      </div>

      {errors.general && (
        <p className="text-red-500 text-sm">{errors.general}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? "Creando..." : "Crear Comunidad"}
      </button>
    </form>
  );
}