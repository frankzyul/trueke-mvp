import { OfferDTO } from "@/lib/types";
import { ArrowRightLeft, Clock, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

interface OfferCardProps {
  offer: OfferDTO;
}

export default function OfferCard({ offer }: OfferCardProps) {
  const getStatusIcon = () => {
    switch (offer.status) {
      case "accepted":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = () => {
    switch (offer.status) {
      case "accepted":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
    }
  };

  const getStatusText = () => {
    switch (offer.status) {
      case "accepted":
        return "Aceptada";
      case "rejected":
        return "Rechazada";
      default:
        return "Pendiente";
    }
  };

  return (
    <Link href={`/intercambio/${offer.id}`}>
      <div className="card hover:shadow-xl transition-all duration-200 cursor-pointer">
        {/* Status Badge */}
        <div className="flex justify-between items-start mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
            {getStatusIcon()}
            <span className="ml-2">{getStatusText()}</span>
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(offer.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Exchange Flow */}
        <div className="space-y-4">
          {/* From Resource */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden flex-shrink-0">
              {offer.fromResource.image ? (
                <img
                  src={offer.fromResource.image}
                  alt={offer.fromResource.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-2xl">📦</span>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                {offer.fromResource.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                por {offer.fromResource.owner.name}
              </p>
            </div>
          </div>

          {/* Exchange Arrow */}
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-teal-500 to-green-500 rounded-full p-2">
              <ArrowRightLeft className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* To Resource */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden flex-shrink-0">
              {offer.toResource.image ? (
                <img
                  src={offer.toResource.image}
                  alt={offer.toResource.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-2xl">📦</span>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                {offer.toResource.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                por {offer.toResource.owner.name}
              </p>
            </div>
          </div>
        </div>

        {/* Action Hint */}
        <div className="mt-6 text-center">
          <span className="text-sm text-teal-600 dark:text-teal-400 font-medium">
            Ver detalles y chat →
          </span>
        </div>
      </div>
    </Link>
  );
}