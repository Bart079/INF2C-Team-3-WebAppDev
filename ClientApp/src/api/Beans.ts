import type { TastingBean } from "../types/tasting";
import { baseUrl, errorFromResponse } from "./http";

type BeanResponse = {
  id: number;
  name: string;
};

async function get<T>(path: string): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`);
  if (!response.ok) {
    throw await errorFromResponse(response);
  }
  return response.json();
}

export async function getAll(): Promise<TastingBean[]> {
  return get<BeanResponse[]>("/api/beans");
}

export async function getById(id: number): Promise<TastingBean> {
  return get<BeanResponse>(`/api/beans/${id}`);
}
