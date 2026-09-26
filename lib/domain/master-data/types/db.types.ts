import { Database } from "@/lib/infra/supabase/types";
import { Camelize } from "@/lib/utils/case-converter";

export type MasterOptionRow = Database["public"]["Views"]["v_master_options"]["Row"];

export type MasterOption = Camelize<MasterOptionRow>;



export type MasterDataRef = {
  id: string;
  name: string;
};
