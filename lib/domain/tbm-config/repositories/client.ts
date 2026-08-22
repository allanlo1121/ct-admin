import { createClient } from "@/lib/infra/supabase/client";
import { assertNoError } from "@/lib/infra/repositories/base.repository";
import { ParameterSubsystemNode, TbmParameterInsertRow } from "../types";
import { ActionResult } from "@/lib/shared/contracts/action-result";


// export async function listTbmSubsystems(): Promise<ParameterSubsystemNode[]> {
//   const supabase = await createClient();

//   const { data, error } = await supabase
//     .schema("tbm")
//     .from("subsystems")
//     .select(
//       `
//       id,
//       code,
//       name,
//       sort_order,
//       runtime_parameters(count)
//     `
//     )
//     .order("sort_order", { ascending: true });

//   assertNoError(error);

//   return (
//     data?.map((item) => ({
//       id: item.id,
//       code: item.code,
//       name: item.name,
//       sortOrder: item.sort_order,

//       parameterCount: item.runtime_parameters?.[0]?.count ?? 0,
//     })) ?? []
//   );
// }




export async function tbmParameterInsertMany(rows: Omit<TbmParameterInsertRow, "id">[]): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .schema("tbm")
    .from("tbm_parameters")
    .insert(rows);
  assertNoError(error);
}

export async function syncTbmRealdataTable(tbmCode: string): Promise<ActionResult<null>> {

  const supabase =  createClient();
  console.log("Syncing TBM realdata table for TBM Code", tbmCode);
  try {
    const { error } = await supabase.schema("tbm").rpc("sync_realdata_table", {
      p_tbm_code: tbmCode,
    });

    console.log("Sync result", { error });
    assertNoError(error);
    return {
      success: true,
      data: null,
      message: "生成实时数据表成功",
    };
  } catch (error) {
    console.error("Error generating real-time data table:", error);
    return {
      success: false,
      message: "生成实时数据表失败",
    };
  }
}
