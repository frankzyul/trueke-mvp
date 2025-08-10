import { Community } from "@/lib/schema";

interface CommunityCardProps {
  community: Community;
}

export default function CommunityCard({ community }: CommunityCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center space-x-4 mb-4">
        {community.avatar ? (
          <img 
            src={community.avatar} 
            alt={community.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {community.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {community.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(community.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm">
        {community.description}
      </p>
    </div>
  );
}