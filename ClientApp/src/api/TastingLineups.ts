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

export type TastingLineupData = {
  tastingId: number;
  beanId: number;
  position: number;
};

export async function create(data: TastingLineupData): Promise<TastingLineup> {
  const response = await fetch(`${baseUrl}/api/tastinglineups`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw await errorFromResponse(response);
  }
  return response.json();
}

export async function remove(id: number): Promise<void> {
  const response = await fetch(`${baseUrl}/api/tastinglineups/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw await errorFromResponse(response);
  }
}

export async function update(
  id: number,
  data: TastingLineupData,
): Promise<TastingLineup> {
  const response = await fetch(`${baseUrl}/api/tastinglineups/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw await errorFromResponse(response);
  }
  return response.json();
}