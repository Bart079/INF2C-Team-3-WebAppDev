import type { TastingSignup } from "../types/TastingSignups";
import { baseUrl, errorFromResponse } from "./http";

type TastingSignupResponse = {
  id: number;
  tastingId: number;
  memberId: number;
  status: string;
  signedUpAt: string;
};

async function get<T>(path: string): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`);
  if (!response.ok) {
    throw await errorFromResponse(response);
  }
  return response.json();
}

export async function getAll(): Promise<TastingSignup[]> {
  return get<TastingSignupResponse[]>("/api/tastingsignups");
}

export async function getById(id: number): Promise<TastingSignup> {
  return get<TastingSignupResponse>(`/api/tastingsignups/${id}`);
}