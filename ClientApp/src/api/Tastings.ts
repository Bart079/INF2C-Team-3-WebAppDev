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
export type TastingData = {
  hostId: number;
  date: string;
  time: string;
  capacity: number;
  cancelled: boolean;
  keyStatus: "available" | "unavailable" | "awaiting";
};

function toRequestBody(data: TastingData) {
  return {
    hostId: data.hostId,
    date: data.date,
    time: data.time,
    capacity: data.capacity,
    cancelled: data.cancelled,
    keyStatus: data.keyStatus,
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

export async function create(data: TastingData): Promise<Tasting> {
  const response = await fetch(`${baseUrl}/api/tastings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toRequestBody(data)),
  });
  if (!response.ok) {
    throw await errorFromResponse(response);
  }
  const raw: TastingResponse = await response.json();
  return toTasting(raw, []);
}

export async function remove(id: number): Promise<void> {
  const response = await fetch(`${baseUrl}/api/tastings/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw await errorFromResponse(response);
  }
}

export async function update(id: number, data: TastingData): Promise<Tasting> {
  const response = await fetch(`${baseUrl}/api/tastings/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toRequestBody(data)),
  });
  if (!response.ok) {
    throw await errorFromResponse(response);
  }
  const raw: TastingResponse = await response.json();
  return toTasting(raw, []);
}