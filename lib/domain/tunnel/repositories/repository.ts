import { createClient } from "@/lib/infra/supabase/server";

import { appErrors, PaginatedResult } from "@/lib/shared/contracts";
import { applyPagination, assertNoError } from "@/lib/infra/repositories/base.repository";

import { tunnelQuery, TunnelQueryType } from "../queries";
import { Tunnel, TunnelListItem, TunnelListRow, TunnelRow, TunnelInsertRow, TunnelUpdateRow } from "../types";

import {
mapTunnelListItem
} from "../mappers";
import { CreateTunnelInput, UpdateTunnelInput } from "../schemas";

import {
  insertTunnelScheduleVersion,
  insertTunnelStatusTimeline,
  updateTunnelScheduleVersion,
  updateTunnelStatusTimeline,
} from "./assignment.repository";



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
  insert: async (input: TunnelInsertRow): Promise<TunnelRow> => {
    console.log("Inserting tunnel with input:", input);


    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("proj")
      .from("tunnels")
      .insert(input)
      .select("*")
      .single();

    // console.log("Insert tunnel result:", { data, error });
    assertNoError(error);

    if (!data) {
      throw appErrors.internal("tunnelRepository.insert", "创建隧道失败");
    }

    return data;
  },
  update: async (id: string, input: TunnelUpdateRow): Promise<TunnelRow> => {


    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("proj")
      .from("tunnels")
      .update(input)
      .eq("id", id)
      .select("*")
      .single();

    assertNoError(error);

    if (!data) {
      throw appErrors.internal("tunnelRepository.update", "更新隧道失败");
    }

    return data;
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

  findById: async (id: string): Promise<TunnelRow> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("proj")
      .from("tunnels")
      .select("*")
      .eq("id", id)
      .single();

    assertNoError(error);

    if (!data) {
      throw appErrors.internal("tunnelRepository.findById", "隧道不存在");
    }


    return data;
  },
  // getTunnelDetailById,
  // getAllList: getAllTunnelList,
  // paginate,
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


