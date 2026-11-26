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