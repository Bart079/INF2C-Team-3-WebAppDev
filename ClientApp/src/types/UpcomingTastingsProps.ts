import type { Tasting, TastingBean, TastingSignup } from "../types/tasting";

export type UpcomingTastingsProps = {
  tastings: Tasting[];
  beans: TastingBean[];
  signups: TastingSignup[];
};

