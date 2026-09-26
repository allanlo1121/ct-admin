"use server";

import { z } from "zod";

import {
  CreateSectionSchema,
} from "../schemas";

import { mapSectionInsert } from "../mappers";
import { sectionRepository } from "../repositories";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type State = {
  errors?: {
    name?: string[];
    shortName?: string[];
    type?: string[];
    projectId?: string[];
    lineMode?: string[];
    sortOrder?: string[];
    isDisabled?: string[];
    remark?: string[];
  };
  message?: string | null;
};

export async function createSectionAction(prevState: State, formData: FormData) {
  console.log("SERVER ACTION RUNNING");
  console.log("create tunnel formData", formData);

  const validatedFields = CreateSectionSchema.safeParse({
    name: formData.get("name"),
    shortName: formData.get("shortName"),
    type: formData.get("type"),
    projectId: formData.get("projectId"),
    lineMode: formData.get("lineMode"),
    sortOrder: formData.get("sortOrder"),
    isDisabled: formData.get("isDisabled"),
    remark: formData.get("remark"),
  });

  console.log("Parsed form data", validatedFields);

  if (!validatedFields.success) {
    return {
      message: "表单验证失败",
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }
  const input = mapSectionInsert(validatedFields.data);
  try {
    await sectionRepository.insert(input);

  } catch (error: unknown) {
    return {
      message: "创建失败",
    };
  }
  revalidatePath('/proj/sections');
  redirect('/proj/sections');

}

// export async function createTunnelScheduleAction(
//   data: CreateTunnelScheduleVersionInput,
//   tunnelId: string
// ): Promise<ActionResult<TunnelScheduleVersion>> {
//   try {
//     const result = await createTunnelScheduleVersion(data, tunnelId);

//     return {
//       success: true,
//       data: result,
//       message: "计划日期已调整",
//     };
//   } catch (error: unknown) {
//     return toActionError(error);
//   }
// }

// export async function createTunnelStatusTimelineAction(
//   data: CreateTunnelStatusTimelineInput,
//   tunnelId: string
// ): Promise<ActionResult<TunnelStatusTimeline>> {
//   try {
//     const result = await createTunnelStatusTimeline(data, tunnelId);

//     return {
//       success: true,
//       data: result,
//       message: "隧道状态已调整",
//     };
//   } catch (error: unknown) {
//     return toActionError(error);
//   }
// }
