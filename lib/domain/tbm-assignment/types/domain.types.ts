// import { TbmInsertRow, TbmListRow, TbmRow } from "./db.types";
// import { Camelize } from "@/lib/utils/case-converter";

import { Camelize } from "@/lib/shared/utils/case-converter";
import { TbmAssignmentListRow } from "./db.types";

export type TbmAssignmentListItem = Camelize<TbmAssignmentListRow>;

export type TbmAssignment = {
  id: string;
  tunnelId: string;
  tbmCode: string;
  startDate: string;
  endDate: string | null;
};
