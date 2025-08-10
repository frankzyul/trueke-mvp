export type CommunityDTO = {
  id: string;
  name: string;
  description: string | null;
  avatar: string | null;
  createdAt: string | Date;
};

export type ResourceDTO = {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  createdAt: string | Date;
  owner: {
    id: string;
    name: string;
    avatar: string | null;
  };
};

export type OfferDTO = {
  id: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string | Date;
  fromResource: {
    id: string;
    title: string;
    description: string | null;
    image: string | null;
    owner: {
      id: string;
      name: string;
      avatar: string | null;
    };
  };
  toResource: {
    id: string;
    title: string;
    description: string | null;
    image: string | null;
    owner: {
      id: string;
      name: string;
      avatar: string | null;
    };
  };
};

export type MessageDTO = {
  id: string;
  content: string;
  createdAt: string | Date;
  sender: {
    id: string;
    name: string;
    avatar: string | null;
  };
};

// Legacy types for backward compatibility
export type CommunityWithResources = CommunityDTO;
export type ResourceWithOwner = ResourceDTO;
export type OfferWithResources = OfferDTO;
export type MessageWithSender = MessageDTO;