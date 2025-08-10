import type { CommunityDTO } from "@/lib/types";
import { Users } from "lucide-react";

interface CommunityCardProps {
  community: CommunityDTO;
}

export default function CommunityCard({ community }: CommunityCardProps) {
  return (
    <div className="card-futuristic group cursor-pointer">
      <div className="flex items-center space-x-4 mb-6">
        {community.avatar ? (
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-400/40 group-hover:border-cyan-400/80 transition-colors">
            <img 
              src={community.avatar} 
              alt={community.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        ) : (
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-white to-cyan-400 flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform">
            <span className="text-black font-bold font-['Orbitron'] text-xl z-10">
              {community.name.charAt(0).toUpperCase()}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-semibold font-['Orbitron'] text-white text-lg group-hover:text-glow transition-all">
            {community.name}
          </h3>
          <p className="text-sm text-cyan-400/80 font-medium">
            {new Date(community.createdAt).toLocaleDateString('es-ES')}
          </p>
        </div>
        <Users className="w-6 h-6 text-cyan-400/60 group-hover:text-cyan-400 icon-neon" />
      </div>
      
      <p className="text-white/70 text-sm leading-relaxed mb-4">
        {community.description}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 electric-pulse"></div>
          <span className="text-xs font-['Orbitron'] text-cyan-400/80 uppercase tracking-wider">
            Activa
          </span>
        </div>
        
        <div className="flex space-x-1">
          <div className="w-1 h-4 bg-gradient-to-t from-cyan-400 to-white rounded opacity-60"></div>
          <div className="w-1 h-3 bg-gradient-to-t from-cyan-400 to-white rounded opacity-40"></div>
          <div className="w-1 h-2 bg-gradient-to-t from-cyan-400 to-white rounded opacity-20"></div>
        </div>
      </div>
      
      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-cyan-400/30 transition-colors pointer-events-none"></div>
    </div>
  );
}