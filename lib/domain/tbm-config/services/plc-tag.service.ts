import { appErrors, PaginatedResult } from "@/lib/shared/contracts";

import { TbmPlcTag } from "../types";
import { CreateTbmPlcTagInput, UpdateTbmPlcTagInput, ImportTbmPlcTagInput } from "../schemas";
import { tbmPlcTagRepository } from "../repositories";
import { tbmRepository } from "../../tbm/repositories";
import { TbmPlcTagQueryType } from "../queries/plc-tag.query";

export async function createTbmPlcTag(input: CreateTbmPlcTagInput): Promise<TbmPlcTag> {
  return await tbmPlcTagRepository.insert(input);
}

export async function updateTbmPlcTag(input: UpdateTbmPlcTagInput): Promise<TbmPlcTag> {
  return await tbmPlcTagRepository.update(input);
}

export async function getTbmPlcTagById(id: number): Promise<TbmPlcTag> {
  const data = await tbmPlcTagRepository.findById(id);
  if (!data) {
    throw appErrors.notFound("未找到TBM参数绑定");
  }
  return data;
}

export async function importTbmPlcTags(tbmCode: string, rows: ImportTbmPlcTagInput[]) {
  await tbmPlcTagRepository.deleteByTbmCode(tbmCode);
  return await tbmPlcTagRepository.insertMany(tbmCode, rows);
}

export async function deleteTbmPlcTag(id: number): Promise<void> {
  await tbmPlcTagRepository.delete(id);
}

export async function listTbmPlcTagsByTbmCode(
  tbmCode: string,
  queryParams: TbmPlcTagQueryType
): Promise<PaginatedResult<TbmPlcTag>> {
  const result = await tbmPlcTagRepository.paginateByTbmCode(tbmCode, queryParams);
  const tbm = await tbmRepository.findByCode(tbmCode);
  if (!tbm) {
    throw appErrors.notFound("未找到TBM");
  }
  const data = result.items.map((tag) => ({
    ...tag,
    tbm: {
      code: tbm.code,
      name: tbm.name,
    },
  }));
  return {
    ...result,
    items: data,
  };
}
