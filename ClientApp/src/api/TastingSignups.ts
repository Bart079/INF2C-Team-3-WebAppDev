import type { TastingSignup } from "../types/TastingSignups";
import { baseUrl, errorFromResponse } from "./http";

type TastingSignupResponse = {
  id: number;
  tastingId: number;
  memberId: number;
  status: string;
  signedUpAt: string;
  queuePosition: number | null;
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

export type CreateTastingSignupData = {
  tastingId: number;
  memberId: number;
};

export type TastingSignupData = {
  tastingId: number;
  memberId: number;
  status: string;
  signedUpAt: string;
};

export async function create(
  data: CreateTastingSignupData,
): Promise<TastingSignup> {
  const response = await fetch(`${baseUrl}/api/tastingsignups`, {
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
  const response = await fetch(`${baseUrl}/api/tastingsignups/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw await errorFromResponse(response);
  }
}

export async function update(
  id: number,
  data: TastingSignupData,
): Promise<TastingSignup> {
  const response = await fetch(`${baseUrl}/api/tastingsignups/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw await errorFromResponse(response);
  }
  return response.json();
}