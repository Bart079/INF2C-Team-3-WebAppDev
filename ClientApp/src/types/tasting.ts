export type Tasting = {
  id: number;
  hostId: number;
  date: string;
  time: string;
  capacity: number;
  cancelled: boolean;
  keyStatus: "available" | "unavailable" | "awaiting";
  lineup: {
    id: number;
    beanId: number;
    position: number;
  }[];
};

export type TastingSignup = {
  tastingId: number;
  memberId: number;
  status: "confirmed" | "waiting";
};

export type TastingBean = {
  id: number;
  name: string;
};