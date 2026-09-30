import { createClient } from "@/lib/infra/supabase/server";

import { PaginatedResult } from "@/lib/shared/contracts";
import { applyPagination, assertNoError } from "@/lib/infra/repositories/base.repository";

import { tunnelQuery, TunnelQueryType } from "../queries";
import { TunnelListItem, TunnelRow, TunnelInsertRow, TunnelUpdateRow, TunnelDetail } from "../types";

import {
  mapTunnelDetail,
  mapTunnelListItem
} from "../mappers";





async function paginate(query: TunnelQueryType): Promise<PaginatedResult<TunnelListItem>> {
  const supabase = await createClient();

  // console.log("org list query", query);

  const { from, to } = applyPagination(query.page, query.pageSize);

  let dbQuery = supabase
    .schema("proj")
    .from("v_tunnel_list")
    .select("*", { count: "exact" })
    .range(from, to);

  if (query.search) {
    dbQuery = dbQuery.ilike("name", `%${query.search}%`);
  }

  if (query.projectId) {
    dbQuery = dbQuery.eq("project_id", query.projectId);
  }

  // 排序逻辑（只排序一次）
  const dbSortField = tunnelQuery.mapSort(query.sortBy);

  dbQuery = dbQuery.order(dbSortField, {
    ascending: query.sortDirection === "asc",
  });

  const { data, count, error } = await dbQuery;

  console.log("Tunnel paginate query result:", { data, count, error });

  assertNoError(error);

  return {
    items: (data ?? []).map(mapTunnelListItem),
    total: count ?? 0,
    page: query.page,
    pageSize: query.pageSize,
  };
}

export const tunnelRepository = {
  insert: async (input: TunnelInsertRow): Promise<void> => {
    console.log("Inserting tunnel with input:", input);


    const supabase = await createClient();

    const { error } = await supabase
      .schema("proj")
      .from("tunnels")
      .insert(input);


    assertNoError(error);

  },
  update: async (id: string, input: TunnelUpdateRow): Promise<void> => {


    const supabase = await createClient();

    const { error } = await supabase
      .schema("proj")
      .from("tunnels")
      .update(input)
      .eq("id", id);


    assertNoError(error);

  },
  deleteById: async (id: string): Promise<void> => {
    const supabase = await createClient();

    const { error } = await supabase
      .schema("proj")
      .from("tunnels")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);

    assertNoError(error);
  },

  findById: async (id: string): Promise<TunnelRow | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("proj")
      .from("tunnels")
      .select("*")
      .eq("id", id)
      .single();

    assertNoError(error);


    return data ?? null;
  },
  findDetailById: async (id: string): Promise<TunnelDetail | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("proj")
      .from("v_tunnel_list")
      .select("*")
      .eq("id", id)
      .single();

    assertNoError(error);

    return data ? mapTunnelDetail(data) : null;
  },
  // getTunnelDetailById,
  // getAllList: getAllTunnelList,
  paginate,
  // softDeleteMany: softDeleteManyTunnel,
  // insertTunnelStatusTimeline,
  // updateTunnelStatusTimeline,
  // insertTunnelScheduleVersion,
  // updateTunnelScheduleVersion,
};

// async function getTunnelDetailById(id: string): Promise<TunnelDetail | null> {
//   const supabase = await createClient();

//   const { data, error } = await supabase
//     .schema("proj")
//     .from("v_tunnel_detail")
//     .select("*")
//     .eq("id", id)
//     .single();

//   assertNoError(error);

//   return data ? mapTunnelDetail(data) : null;
// }


