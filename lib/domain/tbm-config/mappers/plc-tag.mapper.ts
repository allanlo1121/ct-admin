import { CreateTbmPlcTagInput, ImportTbmPlcTagInput, UpdateTbmPlcTagInput } from "../schemas";
import { TbmPlcTag, TbmPlcTagRow, TbmPlcTagInsertRow, TbmPlcTagUpdateRow } from "../types";

export function mapTbmPlcTagInsertRow(input: CreateTbmPlcTagInput): TbmPlcTagInsertRow {
  return {
    tbm_code: input.tbmCode,
    tag_name: input.tagName,
    data_type: input.dataType,
    unit: input.unit,
    internal: input.internal ?? undefined,
    bit: input.bit ?? undefined,
    comment: input.comment ?? undefined,
    archive: input.archive,
    sort_order: input.sortOrder,
  };
}

export function mapTbmPlcTagInsertFromImportRow(
  tbmCode: string,
  input: ImportTbmPlcTagInput
): TbmPlcTagInsertRow {
  return {
    tbm_code: tbmCode,
    tag_name: input.tagName,
    data_type: input.dataType,
    unit: input.unit,
    internal: input.internal ?? undefined,
    bit: input.bit ?? undefined,
    comment: input.comment ?? undefined,
    archive: input.archive,
    sort_order: input.sortOrder,
  };
}

export function mapTbmPlcTagUpdateRow(input: UpdateTbmPlcTagInput): TbmPlcTagUpdateRow {
  return {
    id: input.id,
    tbm_code: input.tbmCode,
    tag_name: input.tagName,
    data_type: input.dataType,
    unit: input.unit,
    internal: input.internal,
    bit: input.bit,
    comment: input.comment,
    archive: input.archive,
    sort_order: input.sortOrder,
  };
}

export function mapTbmPlcTag(row: TbmPlcTagRow): TbmPlcTag {
  if (!row.id) throw new Error("Row id is missing");

  if (!row.tbm_code) throw new Error("Row tbm_code is missing");

  return {
    id: row.id,
    tbmCode: row.tbm_code,
    tagName: row.tag_name,
    dataType: row.data_type,
    unit: row.unit ?? undefined,
    internal: row.internal ?? undefined,
    bit: row.bit ?? undefined,
    archive: row.archive,
    comment: row.comment ?? undefined,
    sortOrder: row.sort_order,
  };
}
