import { z } from "zod";
import { createListQuerySchema } from "@/lib/shared/query/query-factory";


export const tbmParametersQuery = createListQuerySchema({
  sortFields: ["subsystem_code", "parameter_code"] as const,

  map: {
    subsystem_code: "subsystem_code",
    parameter_code: "parameter_code",
  },

  extra: {
    tbmCode: z.string().optional(),

    subsystemCode: z.string().optional(),

    isDisabled: z
      .string()
      .transform((v) => v === "true")
      .optional(),

    search: z.string().optional(),
  },

  defaultSortField: "parameter_code",
});

export type TbmParametersQueryType = z.infer<typeof tbmParametersQuery.schema>;
