import { Database,SetRequired  } from "@/lib/infra/supabase/types";
import type { TbmRuntimeParameterListItem } from "./parameter.types";
import { Camelize } from "@/lib/utils/case-converter";


export type TbmParameterRow = Database["tbm"]["Tables"]["tbm_parameters"]["Row"];
export type TbmParameterInsertRow =
  Database["tbm"]["Tables"]["tbm_parameters"]["Insert"];
export type TbmParameterUpdateRow =
  Database["tbm"]["Tables"]["tbm_parameters"]["Update"];

export type DbTbmParameterListRow = Database["tbm"]["Views"]["v_tbm_parameters"]["Row"];

export type TbmParameterListRow = SetRequired<DbTbmParameterListRow, "id" | "tbm_code" | "parameter_code" | "parameter_name" | "subsystem_code" | "subsystem_name">;

// export type TbmParameterListItem = Camelize<DbTbmParameterListRow>;

// export type TbmParameterConfigListRow = Database["tbm"]["Views"]["v_tbm_parameter_configs"]["Row"];

export type TbmParameterConfig = {
  id: number;
  customName?: string;
  customUnit?: string;
  isDisabled: boolean;
  parameterId: number;
  plcTagId?: number;
  remark?: string;
  scale: number;
  tbmCode: string;
  valueOffset: number;
};

export type TbmParameterConfigListItem = {
  tbmParameterId: number;
  tbmName: string;
  tbmCode: string;
  parameterId: number;
  parameterName: string;
  isDisabled: boolean;
  customName?: string;
  customUnit?: string;
  archive?: boolean;
  parameterCode?: string;
  parameterDataType?: string;
  parameterDigits?: number;
  parameterUnit?: string;
  plcDataType?: string;
  plcTagComment?: string;
  plcTagId?: number;
  plcUnit?: string;
  scale?: number;
  sortOrder?: number;
  subsystemCode?: string;
  subsystemId?: number;
  subsystemName?: string;
  tagName?: string;
  valueOffset?: number;
};

export type TbmParameterConfigGroup = {
  subsystemId: number;
  subsystemCode: string;
  subsystemName: string;
  runtimeParameters: TbmRuntimeParameterListItem[];
  tbmParameterIds: number[];
};

export interface ParameterItem {
  parameterId: number;
  parameterCode: string;
  parameterName: string;
  dataType: string;
  unit?: string;
  digits?: number;
}

export interface ParameterGroup {
  subsystemId: number;
  subsystemCode: string;
  subsystemName: string;
  parameters: ParameterItem[];
}

export interface ImportTbmParameterConfigRow {
  no: number;
  parameterCode: string;
  parameterName: string;
  tagName: string;
  comment: string;
  scale: number;
  valueOffset: number;
  customName?: string;
  customUnit?: string;
  isDisabled: boolean;
}
