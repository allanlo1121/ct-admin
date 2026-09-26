
import { z } from "zod";
import { idSchema, } from "@/lib/shared/schema";
import { sectionTypes, lineModes } from "../types/domain.types";

/**
 * Section 工点字段规则
 */
export const SectionFormSchema = z.object({
  id: idSchema,
  name: z
    .string()
    .min(4, { message: "工点简称至少4个字符" })
    .max(40, { message: "工点简称最多40个字符" }),

  shortName: z
    .string()
    .min(4, { message: "工点简称至少4个字符" })
    .max(8, { message: "工点简称最多16个字符" }),

  projectId: idSchema,

  type: z.enum(sectionTypes),

  lineMode: z.enum(lineModes).optional(),


  sortOrder: z.coerce
    .number()
    .min(1, { message: "排序值不能为负数" })
    .default(99),
  isDisabled: z.coerce
    .boolean()
    .default(false),
  remark: z
    .string()
    .max(500, { message: "备注最多500个字符" }),
})

export const SectionSchema = SectionFormSchema;

export const CreateSectionSchema = SectionFormSchema.omit({ id: true });

export type CreateSectionInput = z.infer<typeof CreateSectionSchema>;

export type SectionFields = keyof z.infer<typeof SectionFormSchema>;

export const UpdateSectionSchema = SectionFormSchema.omit({
  id: true,
});

export type UpdateSectionInput = z.infer<typeof UpdateSectionSchema>;
