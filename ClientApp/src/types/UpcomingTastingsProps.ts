import type { Tasting, TastingBean } from "./tasting";
import type { TastingSignup } from "./TastingSignups";

export type SignupFeedback = {
  message: string;
};

export type UpcomingTastingsProps = {
  tastings: Tasting[];
  beans: TastingBean[];
  signups: TastingSignup[];
  onSignup: (tastingId: number) => Promise<void>;
  signingUpTastingId: number | null;
  signupFeedback: Record<number, SignupFeedback>;
  onConfirmKey: (tastingId: number) => Promise<void>;
  confirmingKeyTastingId: number | null;
  keyFeedback: Record<number, string>;
  onCancelTasting: (tastingId: number) => Promise<void>;
  cancellingTastingId: number | null;
};

