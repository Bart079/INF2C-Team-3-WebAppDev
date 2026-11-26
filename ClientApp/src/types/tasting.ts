import type { TastingSignup } from "./TastingSignups";

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

export type TastingBean = {
  id: number;
  name: string;
};

export type HostedTastingCardProps = {
  tasting: Tasting;
  beans: TastingBean[];
  signups: TastingSignup[];
};