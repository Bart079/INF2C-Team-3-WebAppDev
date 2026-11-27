import type { TastingScore } from "../types/TastingScores";
import { baseUrl, errorFromResponse } from "./http";

type TastingScoreResponse = {
  id: number;
  lineupId: number;
  memberId: number;
  points: number;
  remark: string | null;
};

async function get<T>(path: string): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`);
  if (!response.ok) {
    throw await errorFromResponse(response);
  }
  return response.json();
}

export async function getAll(): Promise<TastingScore[]> {
  return get<TastingScoreResponse[]>("/api/tastingscores");
}

export async function getById(id: number): Promise<TastingScore> {
  return get<TastingScoreResponse>(`/api/tastingscores/${id}`);
}

export type TastingScoreData = {
  lineupId: number;
  memberId: number;
  points: number;
  remark: string | null;
};

export async function create(data: TastingScoreData): Promise<TastingScore> {
  const response = await fetch(`${baseUrl}/api/tastingscores`, {
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
  const response = await fetch(`${baseUrl}/api/tastingscores/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw await errorFromResponse(response);
  }
}

export async function update(
  id: number,
  data: TastingScoreData,
): Promise<TastingScore> {
  const response = await fetch(`${baseUrl}/api/tastingscores/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw await errorFromResponse(response);
  }
  return response.json();
}