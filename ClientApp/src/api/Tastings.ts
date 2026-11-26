import type { TastingLineup } from "../types/TastingLineups";
import type { TastingSignup } from "../types/TastingSignups";
import type { Tasting, TastingBean } from "../types/tasting";
import * as beansApi from "./Beans";
import * as signupsApi from "./TastingSignups";
import * as lineupsApi from "./TastingLineups";
import { baseUrl, errorFromResponse } from "./http";

type TastingResponse = {
  id: number;
  hostId: number;
  date: string;
  time: string;
  capacity: number;
  cancelled: boolean;
  keyStatus: "available" | "unavailable" | "awaiting";
};

async function get<T>(path: string): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`);
  if (!response.ok) {
    throw await errorFromResponse(response);
  }
  return response.json();
}

function toTasting(raw: TastingResponse, lineups: TastingLineup[]): Tasting {
  return {
    id: raw.id,
    hostId: raw.hostId,
    date: raw.date,
    time: raw.time.slice(0, 5),
    capacity: raw.capacity,
    cancelled: raw.cancelled,
    keyStatus: raw.keyStatus,
    lineup: lineups
      .filter((lineup) => lineup.tastingId === raw.id)
      .map(({ id, beanId, position }) => ({ id, beanId, position })),
  };
}

export async function getAll(): Promise<{
  tastings: Tasting[];
  beans: TastingBean[];
  signups: TastingSignup[];
}> {
  const [tastings, beans, signups, lineups] = await Promise.all([
    get<TastingResponse[]>("/api/tastings"),
    beansApi.getAll(),
    signupsApi.getAll(),
    lineupsApi.getAll(),
  ]);

  return {
    tastings: tastings.map((tasting) => toTasting(tasting, lineups)),
    beans,
    signups,
  };
}

export async function getById(id: number): Promise<{
  tasting: Tasting;
  beans: TastingBean[];
  signups: TastingSignup[];
}> {
  const [tasting, beans, signups, lineups] = await Promise.all([
    get<TastingResponse>(`/api/tastings/${id}`),
    beansApi.getAll(),
    signupsApi.getAll(),
    lineupsApi.getAll(),
  ]);

  return {
    tasting: toTasting(tasting, lineups),
    beans,
    signups,
  };
}