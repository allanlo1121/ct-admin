
import { idSchema } from "@/lib/shared/schema";
import { z } from "zod";

/**
 * Tunnel字段规则
 */
export const TunnelFormSchema = z.object({
  id: idSchema,
  name: z
    .string()
    .min(2, { message: "隧道简称至少2个字符" })
    .max(10, { message: "隧道简称最多10个字符" }),

  aliasName: z
    .string()
    .max(20, { message: "隧道全称最多20个字符" })
    .optional()
    .nullable(),

  sectionId: idSchema,

  prefix: z
    .string()
    .max(20, { message: "隧道编号前缀最多20个字符" })
    .optional()
    .nullable(),
  startChainage: z.coerce
    .number()
    .default(0),

  endChainage: z.coerce
    .number()
    .default(0),

  adjustment: z.coerce
    .number()
    .default(0),

  sortOrder: z.coerce
    .number()
    .default(1),
  isDisabled: z.coerce
    .boolean()
    .default(false),
  remark: z
    .string()
    .max(500, { message: "备注最多500个字符" })
    .optional()
    .nullable(),
});

export const TunnelSchema = TunnelFormSchema;

export const CreateTunnelSchema = TunnelFormSchema.omit({ id: true });

export type CreateTunnelInput = z.infer<typeof CreateTunnelSchema>;

export type TunnelFields = keyof z.infer<typeof TunnelFormSchema>;

export const UpdateTunnelSchema = TunnelFormSchema.omit({ id: true });

export type UpdateTunnelInput = z.infer<typeof UpdateTunnelSchema>;
