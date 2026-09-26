import { Database, SetRequired } from "@/lib/infra/supabase/types";

export type SectionTypeEnumRow = Database["proj"]["Enums"]["section_type"];

export type LineModeEnumRow = Database["proj"]["Enums"]["line_mode"];



export type SectionRow = Database["proj"]["Tables"]["sections"]["Row"];
export type SectionInsertRow = Database["proj"]["Tables"]["sections"]["Insert"];
export type SectionUpdateRow = Database["proj"]["Tables"]["sections"]["Update"];



// views
export type SectionListRow = Database["proj"]["Views"]["v_section_list"]["Row"];




// export type SectionDetailRow = Database["proj"]["Views"]["v_section_detail"]["Row"];

// export type SectionPickerRow = Database["proj"]["Views"]["v_section_picker"]["Row"];



