import { Database } from "@/lib/infra/supabase/types";

export type TbmRuntimeParameterRow = Database["tbm"]["Tables"]["parameters"]["Row"];
export type TbmRuntimeParameterInsertRow =
  Database["tbm"]["Tables"]["parameters"]["Insert"];
export type TbmRuntimeParameterUpdateRow =
  Database["tbm"]["Tables"]["parameters"]["Update"];

export type TbmRuntimeParameterListRow =
  Database["tbm"]["Views"]["v_parameters_list"]["Row"];
export type TbmRuntimeParameterPickerRow =
  Database["tbm"]["Views"]["v_parameters_picker"]["Row"];

export type TbmParameter = {
  id: number;
  name: string;
  code: string;
  dataType: string;
  digits: number;
  isAlarm: boolean;
  isDisabled: boolean;
  isGroup: boolean;
  isReportable: boolean;
  isTrendable: boolean;
  isVirtual: boolean;
  remark: string | null;
  sortOrder: number;
  subsystemId: number | null;
  unit: string | null;
};

export type TbmParameterListItem = {
  id: number;
  name: string;
  code: string;
  dataType: string;
  unit: string | null;
  digits: number;
  isAlarm: boolean;
  isDisabled: boolean;
  sortOrder: number;
  subsystemId: number | null;
  subsystemName: string | null;
};

export type TbmRuntimeParameterWithSubsystem = TbmParameter & {
  subsystemName: string;
};

export type TbmRuntimeParameterPickerItem = {
  id: number;
  name: string;
  code: string;
  subsystemCode: string;
  subsystemName: string;
};
