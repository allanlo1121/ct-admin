
import { idSchema, optionalPositiveNumber } from "@/lib/shared/schema";
import { z } from "zod";

/**
 * Tunnel字段规则
 */
export const tunnelSegmentBaseSchema = z.object({
  id: idSchema,
  tunnel_id: idSchema,
  name: z.string().min(3, { message: "名称最少3个字符" }).max(100, { message: "名称最多100个字符" }),

  start_ring_no: z.number()
    .int("起始环号必须是整数")
    .min(1, "起始环号必须大于等于 1"),

  end_ring_no: z.number()
    .int("结束环号必须是整数")
    .min(1, "结束环号必须大于等于 1"),

  ring_width: z.number().positive("环宽必须大于 0"),

  inner_diameter: z.number().positive("内径必须大于 0"),
  outer_diameter: z.number().positive("外径必须大于 0"),
  thickness: z.number().positive("厚度必须大于 0"),
  remark: z
    .string()
    .max(500, { message: "备注最多500个字符" }),
});

export const tunnelSegmentSchema = tunnelSegmentBaseSchema.superRefine(validateRingRange);

export const createTunnelSegmentSchema = tunnelSegmentBaseSchema.omit({ id: true, tunnel_id: true }).superRefine(validateRingRange);

export type CreateTunnelSegmentInput = z.infer<typeof createTunnelSegmentSchema>;

export type TunnelSegmentFields = keyof z.infer<typeof tunnelSegmentBaseSchema>;

export const updateTunnelSegmentSchema = tunnelSegmentBaseSchema.omit({ id: true }).superRefine(validateRingRange);;

export type UpdateTunnelSegmentInput = z.infer<typeof updateTunnelSegmentSchema>;


function validateRingRange(
  data: {
    start_ring_no: number
    end_ring_no: number
  },
  ctx: z.RefinementCtx
) {
  if (data.end_ring_no < data.start_ring_no) {
    ctx.addIssue({
      code: "custom",
      path: ["end_ring_no"],
      message: "结束环号不能小于起始环号",
    })
  }
}