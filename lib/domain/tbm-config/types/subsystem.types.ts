import { Database } from "@/lib/infra/supabase/types";

export type TbmSubsystemRow = Database["tbm"]["Tables"]["subsystems"]["Row"];
export type TbmSubsystemInsert = Database["tbm"]["Tables"]["subsystems"]["Insert"];
export type TbmSubsystemUpdate = Database["tbm"]["Tables"]["subsystems"]["Update"];

// export type TbmSubsystemListRow = Database["tbm"]["Views"]["v_tbm_subsystems_list"]["Row"];
// export type TbmSubsystemPicker = Database["tbm"]["Views"]["v_tbm_subsystems_picker"]["Row"];

export type TbmSubsystem = {
  id: number;
  name: string;
  code: string;
  isConfigurable: boolean;
  isDisabled: boolean;
  remark: string | null;
  sortOrder: number;
};


export type ParameterSubsystemRow = {
  id: number;
  name: string;
  code: string;
  sort_order: number;
  parameter_count?: number;
  is_configurable?: boolean;
};

export type ParameterSubsystemNode = {
  id: number;
  code: string;
  name: string;
  sortOrder: number;
  parameterCount?: number;
  isConfigurable?: boolean;
};
