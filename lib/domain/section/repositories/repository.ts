import { createClient } from "@/lib/infra/supabase/server";

import { appErrors, PaginatedResult } from "@/lib/shared/contracts";
import { applyPagination, assertNoError } from "@/lib/infra/repositories/base.repository";

import { sectionQuery, SectionQueryType } from "../queries";
import { SectionInsertRow, SectionListItem, SectionRow, SectionUpdateRow } from "../types";
import { mapSectionListItem } from "../mappers";

export const sectionRepository = {
  insert: async (input: SectionInsertRow): Promise<SectionRow> => {
    console.log("Inserting section with input:", input);

    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("proj")
      .from("sections")
      .insert(input)
      .select("*")
      .single();

    // console.log("Insert section result:", { data, error });
    assertNoError(error);

    if (!data) {
      throw new Error("创建工点失败");
    }
    return data;
  },
  update: async (id: string, input: SectionUpdateRow): Promise<SectionRow | null> => {

    console.log("Updating section with id:", id, "and input:", input);

    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("proj")
      .from("sections")
      .update(input)
      .eq("id", id)
      .select("*")
      .single();

    assertNoError(error);

    return data ?? null;
  },
  deleteById: async (id: string): Promise<void> => {
    const supabase = await createClient();

    const { error } = await supabase
      .schema("proj")
      .from("sections")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);

    assertNoError(error);
  },

  findById: async (id: string): Promise<SectionRow | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("proj")
      .from("sections")
      .select("*")
      .eq("id", id)
      .single();

    assertNoError(error);

    return data ? data : null;
  },
  // getSectionDetailById,
  paginate,
  fetchPages,

};


async function paginate(query: SectionQueryType): Promise<PaginatedResult<SectionListItem>> {
  const supabase = await createClient();

  // console.log("org list query", query);

  const { from, to } = applyPagination(query.page, query.pageSize);

  let dbQuery = supabase
    .schema("proj")
    .from("v_section_list")
    .select("*", { count: "exact" })
    .range(from, to);

  if (query.search) {
    dbQuery = dbQuery.ilike("name", `%${query.search}%`);
  }

  if (query.organizationId) {
    dbQuery = dbQuery.eq("organization_id", query.organizationId);
  }

  // 排序逻辑（只排序一次）
  const dbSortField = sectionQuery.mapSort(query.sortBy);

  dbQuery = dbQuery.order(dbSortField, {
    ascending: query.sortDirection === "asc",
  });

  const { data, count, error } = await dbQuery;

  console.log("Section paginate query result:", { data, count, error });

  assertNoError(error);

  return {
    items: (data ?? []).map(mapSectionListItem),
    total: count ?? 0,
    page: query.page,
    pageSize: query.pageSize,
  };

}

async function fetchPages(query: string,items_per_page: number  ): Promise<number> {
  const supabase = await createClient();

  let dbQuery = supabase
    .schema("proj")
    .from("v_section_list")
    .select("id", { count: "exact" });

  if (query) {
    dbQuery = dbQuery.ilike("name", `%${query}%`);
  }

  const { count, error } = await dbQuery;

  assertNoError(error);

  return Math.ceil((count ?? 0) / items_per_page);
}

// async function getSectionDetailById(id: string): Promise<SectionDetailRow | null> {
//   const supabase = await createClient();

//   const { data, error } = await supabase
//     .schema("proj")
//     .from("v_section_detail")
//     .select("*")
//     .eq("id", id)
//     .single();

//   assertNoError(error);

//   return data ?? null;
// }


