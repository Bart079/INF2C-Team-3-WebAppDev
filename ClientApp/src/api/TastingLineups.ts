import type { TastingLineup } from "../types/TastingLineups";
import { baseUrl, errorFromResponse } from "./http";

type TastingLineupResponse = {
  id: number;
  tastingId: number;
  beanId: number;
  position: number;
};

async function get<T>(path: string): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`);
  if (!response.ok) {
    throw await errorFromResponse(response);
  }
  return response.json();
}

export async function getAll(): Promise<TastingLineup[]> {
  return get<TastingLineupResponse[]>("/api/tastinglineups");
}

export async function getById(id: number): Promise<TastingLineup> {
  return get<TastingLineupResponse>(`/api/tastinglineups/${id}`);
}