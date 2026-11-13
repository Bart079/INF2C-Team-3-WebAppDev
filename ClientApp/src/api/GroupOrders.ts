import type { Order } from "../types/Order";
import type { GroupOrderResponse } from "../types/GroupOrderResponse";
import type { BeanResponse } from "../types/BeanResponse";
import type { MemberResponse } from "../types/MemberResponse";

import { baseUrl, errorFromResponse } from "./http";

function toOrder(
  raw: GroupOrderResponse,
  beans: BeanResponse[],
  members: MemberResponse[]
): Order {
  const bean = beans.find(item => item.id === raw.beanId);
  const member = members.find(item => item.id === raw.startedById);

  return {
    id: raw.id,
    bean: bean?.name ?? "Unknown bean",
    startedBy: member?.username ?? null,
    minimumGrams: raw.minimumGrams,
    totalGrams: raw.totalGrams,
    closingDate: raw.closingDate,
    status: raw.status
  };
}

async function get<T>(path: string): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`);

  if (!response.ok) {
    throw await errorFromResponse(response);
  }

  return response.json() as Promise<T>;
}

export async function getAll(): Promise<Order[]> {
  const [orders, beans, members] = await Promise.all([
    get<GroupOrderResponse[]>("/api/grouporders"),
    get<BeanResponse[]>("/api/beans"),
    get<MemberResponse[]>("/api/members")
  ]);

  return orders.map(order => toOrder(order, beans, members));
}

export async function getById(id: number): Promise<Order> {
  const [order, beans, members] = await Promise.all([
    get<GroupOrderResponse>(`/api/grouporders/${id}`),
    get<BeanResponse[]>("/api/beans"),
    get<MemberResponse[]>("/api/members")
  ]);

  return toOrder(order, beans, members);
}
