"use client";

import { useState } from "react";
import { createCommunitySchema } from "@/lib/validators";
import { Zap } from "lucide-react";

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium font-['Orbitron'] text-white/90 mb-3">
          Nombre de la comunidad
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="input-futuristic"
          placeholder="Nombre de tu comunidad"
        />
        {errors.name && <p className="text-red-400 text-xs mt-2 font-medium">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium font-['Orbitron'] text-white/90 mb-3">
          Descripción
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="input-futuristic resize-none"
          placeholder="Describe tu comunidad..."
        />
        {errors.description && <p className="text-red-400 text-xs mt-2 font-medium">{errors.description}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium font-['Orbitron'] text-white/90 mb-3">
          Avatar (opcional)
        </label>
        <input
          type="url"
          value={formData.avatar}
          onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
          className="input-futuristic"
          placeholder="https://ejemplo.com/avatar.jpg"
        />
        {errors.avatar && <p className="text-red-400 text-xs mt-2 font-medium">{errors.avatar}</p>}
      </div>

      {errors.general && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
          <p className="text-red-400 text-sm font-medium">{errors.general}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full inline-flex items-center justify-center space-x-2 font-['Orbitron'] font-medium"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
            <span>Creando...</span>
          </>
        ) : (
          <>
            <Zap className="w-5 h-5" />
            <span>Crear Comunidad</span>
          </>
        )}
      </button>
    </form>
  );
}