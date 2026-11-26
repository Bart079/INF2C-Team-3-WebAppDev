import type { Tasting, TastingBean } from "./tasting";
import type { TastingSignup } from "./TastingSignups";

export type UpcomingTastingsProps = {
  tastings: Tasting[];
  beans: TastingBean[];
  signups: TastingSignup[];
};

