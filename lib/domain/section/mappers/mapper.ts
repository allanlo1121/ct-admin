import { CreateSectionInput, UpdateSectionInput, } from "../schemas";
import type { SectionListRow, SectionListItem, SectionUpdateRow } from "../types";
import {
  LineModeEnumRow,
  Section,
  SectionRow,
  SectionInsertRow,
  SectionTypeEnumRow,


} from "../types";
import { LineMode, SectionType } from "../types/domain.types";

export function mapSectionListItem(row: SectionListRow): SectionListItem {
  return {
    id: row.id!,
    name: row.name!,
    shortName: row.short_name,
    type: toSectionTypeRow(row.type!),
    lineMode: row.line_mode ? toLineModeRow(row.line_mode) : null,
    region: {
      id: row.region_id!,
      name: row.region_name!,
    },
    organization: {
      id: row.organization_id!,
      name: row.organization_name!,
    },
    project: {
      id: row.project_id!,
      name: row.project_name!,
    },
    sortOrder: row.sort_order!,
    isDisabled: row.is_disabled!,
    remark: row.remark,
  };
}

export function mapSection(row: SectionRow): Section {
  return {
    id: row.id,
    name: row.name,
    shortName: row.short_name,

    type: toSectionType(row.type!),
    lineMode: row.line_mode ? toLineMode(row.line_mode) : null,

    projectId: row.project_id,
    sortOrder: row.sort_order,
    isDisabled: row.is_disabled,
    remark: row.remark,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    deletedAt: row.deleted_at,

    createdBy: row.created_by,
    updatedBy: row.updated_by,
    deletedBy: row.deleted_by,
  };
}

// export function mapSectionUpdate(input: UpdateTunnelInput): TunnelUpdateRow {
//   return {
//     id: input.id,
//     name: input.name,
//     full_name: input.fullName,

//     project_id: input.projectId,
//     prefix: input.prefix,
//     start_ring: input.startRing,
//     end_ring: input.endRing,
//     start_chainage: input.startChainage,
//     end_chainage: input.endChainage,

//     actual_end_date: input.actualEndDate,
//     actual_start_date: input.actualStartDate,

//     geology: input.geology,
//     latitude: input.latitude,
//     longitude: input.longitude,

//     sort_order: input.sortOrder,
//     is_disabled: input.isDisabled,
//     remark: input.remark,
//   };
// }

export function mapSectionInsert(input: CreateSectionInput): SectionInsertRow {
  return {
    name: input.name,
    short_name: input.shortName,

    project_id: input.projectId,
    type: toSectionTypeRow(input.type),
    line_mode: input.lineMode ? toLineModeRow(input.lineMode) : undefined,

    sort_order: input.sortOrder,
    is_disabled: input.isDisabled,
    remark: input.remark,
  };
}


export function mapSectionUpdate(input: UpdateSectionInput): SectionUpdateRow {
  return {
    name: input.name,
    short_name: input.shortName,

    project_id: input.projectId,
    type: toSectionTypeRow(input.type),
    line_mode: input.lineMode ? toLineModeRow(input.lineMode) : undefined,

    sort_order: input.sortOrder,
    is_disabled: input.isDisabled,
    remark: input.remark,
  };
}


// export function mapCreateTunnelInputFromTunnelFullInput(
//   input: CreateTunnelFullInput
// ): CreateTunnelInput {
//   return {
//     name: input.name,
//     fullName: input.fullName,

//     projectId: input.projectId,
//     prefix: input.prefix,
//     startRing: input.startRing,
//     endRing: input.endRing,
//     startChainage: input.startChainage,
//     endChainage: input.endChainage,

//     actualEndDate: input.actualEndDate,
//     actualStartDate: input.actualStartDate,

//     geology: input.geology,
//     latitude: input.latitude,
//     longitude: input.longitude,

//     sortOrder: input.sortOrder,
//     isDisabled: input.isDisabled,
//     remark: input.remark,
//   };
// }

// export function mapSectionDetail(row: TunnelDetailRow): TunnelDetail {
//   return {
//     id: row.id,
//     name: row.name,
//     tunnelStatusName: row.tunnel_status_name,
//     projectName: row.project_name,
//     organizationName: row.organization_name,
//     prefix: row.prefix,
//     startRing: row.start_ring,
//     endRing: row.end_ring,
//     startChainage: row.start_chainage,
//     endChainage: row.end_chainage,
//     advanceDirection: row.advance_direction,

//     actualEndDate: row.actual_end_date,
//     actualStartDate: row.actual_start_date,
//     scheduleEndDate: row.schedule_end_date,
//     scheduleStartDate: row.schedule_start_date,

//     geology: row.geology,
//     latitude: row.latitude,
//     longitude: row.longitude,

//     sortOrder: row.sort_order,

//     remark: row.remark,
//     createdAt: row.created_at,
//     updatedAt: row.updated_at,
//     createdBy: row.created_by,
//     updatedBy: row.updated_by,
//   };
// }

  




export function toSectionTypeRow(
  type: SectionType
): SectionTypeEnumRow {
  switch (type) {
    case "station":
      return "station"
    case "tunnel":
      return "tunnel"
    case "depot":
      return "depot"
    case "other":
      return "other"
  }
}

export function toSectionType(
  type: SectionTypeEnumRow
): SectionType {
  switch (type) {
    case "station":
      return "station"
    case "tunnel":
      return "tunnel"
    case "depot":
      return "depot"
    case "other":
      return "other"
  }
}


export function toLineModeRow(
  type: LineMode
): LineModeEnumRow {
  switch (type) {
    case "single":
      return "single"
    case "double":
      return "double"
  }
}

export function toLineMode(
  type: LineModeEnumRow
): LineMode {
  switch (type) {
    case "single":
      return "single"
    case "double":
      return "double"
  }
}