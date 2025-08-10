import { ResourceWithOwner } from "@/lib/types";

interface ResourceCardProps {
  resource: ResourceWithOwner;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
      {resource.image && (
        <img 
          src={resource.image} 
          alt={resource.title}
          className="w-full h-48 object-cover rounded-xl mb-4"
        />
      )}
      
      <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
        {resource.title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
        {resource.description}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {resource.owner.avatar ? (
            <img 
              src={resource.owner.avatar} 
              alt={resource.owner.name}
              className="w-6 h-6 rounded-full object-cover"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">
                {resource.owner.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {resource.owner.name}
          </span>
        </div>
        
        <span className="text-xs text-gray-400">
          {new Date(resource.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}