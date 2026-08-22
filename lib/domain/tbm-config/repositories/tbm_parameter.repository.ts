
import { createClient } from "@/lib/infra/supabase/server";

import type { TbmParameterListRow, TbmParameterInsertRow } from "../types";
import { applyPagination, assertNoError } from "@/lib/infra/repositories/base.repository";

import { appErrors, PaginatedResult } from "@/lib/shared/contracts";

import { tbmParametersQuery, TbmParametersQueryType } from "../queries";




export const tbmParametersRepository = {

  async getTbmParameters(tbmCode: string): Promise<TbmParameterListRow[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .schema("tbm")
      .from("v_tbm_parameters")
      .select("*")
      .eq("tbm_code", tbmCode)
      .eq("is_disabled", false)
      .order("parameter_code", { ascending: true })
      .overrideTypes<TbmParameterListRow[]>();
    assertNoError(error);

    return data ?? [];
  },


  async paginateByTbmCode(
    tbmCode: string,
    query: TbmParametersQueryType
  ): Promise<PaginatedResult<TbmParameterListRow>> {
    const supabase = await createClient();

    // console.log("org list query", query);

    const { from, to } = applyPagination(query.page, query.pageSize);

    let dbQuery = supabase
      .schema("tbm")
      .from("v_tbm_parameters")
      .select("*", { count: "exact" })
      .eq("tbm_code", tbmCode)
      .range(from, to)


    if (query.subsystemCode) {
      dbQuery = dbQuery.eq("subsystem_code", query.subsystemCode);
    }

    if (typeof query.isDisabled === "boolean") {
      dbQuery = dbQuery.eq("is_disabled", query.isDisabled);
    }

    if (query.search) {
      dbQuery = dbQuery.or(`parameter_name.ilike.%${query.search}%,parameter_code.ilike.%${query.search}%`);
    }

    // 排序逻辑（只排序一次）
    const dbSortField = tbmParametersQuery.mapSort(query.sortBy);

    dbQuery = dbQuery.order(dbSortField, {
      ascending: query.sortDirection === "asc",
    });

    const { data, count, error } = await dbQuery.overrideTypes<TbmParameterListRow[]>();;

    console.log("Tunnel paginate query result:", { data, count, error });

    assertNoError(error);

    return {
      items: data ?? [],
      total: count ?? 0,
      page: query.page,
      pageSize: query.pageSize,
    };
  },


  async syncTbmRealdataTable(tbmCode: string): Promise<void> {
    const supabase = await createClient();
    console.log("Syncing TBM realdata table for TBM Code", tbmCode);
    const { error } = await supabase.schema("tbm").rpc("sync_realdata_table", {
      p_tbm_code: tbmCode,
    });

    console.log("Sync result", { error });
    assertNoError(error);
  }



}