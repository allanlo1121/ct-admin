// import { PaginatedResult, appErrors } from "@/lib/shared/contracts";

// import {
//   TbmParameterConfig,
//   TbmParameterConfigInsertRow,
//   TbmParameterConfigListItem,
//   ParameterGroup,
// } from "../types";
// import {
//   CreateTbmParameterConfigInput,
//   UpdateTbmParameterConfigInput,
//   ImportTbmParameterConfigInput,
// } from "../schemas";
// import { buildParameterGroups } from "../mappers";
// import { tbmParameterConfigRepository, trpRepository } from "../repositories";
// import { TbmParameterConfigQueryType } from "../queries";

// export async function createTbmParameterConfig(
//   input: CreateTbmParameterConfigInput
// ): Promise<TbmParameterConfig> {
//   return await tbmParameterConfigRepository.insert(input);
// }

// export async function updateTbmParameterConfig(
//   input: UpdateTbmParameterConfigInput
// ): Promise<TbmParameterConfig> {
//   return await tbmParameterConfigRepository.update(input);
// }

// export async function deleteTbmParameterConfig(id: number): Promise<void> {
//   await tbmParameterConfigRepository.deleteById(id);
// }

// export async function getTbmParameterConfigById(id: number): Promise<TbmParameterConfig> {
//   const data = await tbmParameterConfigRepository.findById(id);
//   if (!data) {
//     throw appErrors.notFound("未找到TBM参数绑定");
//   }
//   return data;
// }



// export async function findTbmBoundParameterGroups(tbmCode: string): Promise<ParameterGroup[]> {
//   const data = await tbmParameterConfigRepository.getTbmParameterConfigs(tbmCode);

//   console.log("findTbmBoundParameterGroups data", data);

//   return buildParameterGroups(data);
// }

// export async function importTbmParameterConfigs(
//   tbmCode: string,
//   rows: ImportTbmParameterConfigInput[]
// ) {
//   const configs: TbmParameterConfigInsertRow[] = rows.map((row) => ({
//     tbm_code: tbmCode,
//     parameter_id: row.parameterId!,
//     plc_tag_id: row.plcTagId ?? undefined,
//     scale: row.scale ?? 1,
//     value_offset: row.valueOffset ?? 0,
//     custom_name: row.customName ?? undefined,
//     custom_unit: row.customUnit ?? undefined,
//     is_disabled: row.isDisabled ?? false,
//   }));

//   await tbmParameterConfigRepository.deleteByTbmCode(tbmCode);

//   return tbmParameterConfigRepository.insertMany(configs);
// }

// export async function listTbmParameterConfigsByTbmCode(
//   tbmCode: string,
//   query: TbmParameterConfigQueryType
// ): Promise<PaginatedResult<TbmParameterConfigListItem>> {
//   return tbmParameterConfigRepository.paginateByTbmCode(tbmCode, query);
// }

// export async function syncTbmRealdataTable(tbmCode: string): Promise<void> {
//   await tbmParameterConfigRepository.syncTbmRealdataTable(tbmCode);
// }
