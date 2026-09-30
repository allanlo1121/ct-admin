"use server";

import { z } from "zod";
import { UpdateSectionSchema } from "../schemas";
import { mapSectionUpdate } from "../mappers";


import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sectionRepository } from "../repositories";

 import type { State } from "./create.action";

export async function updateSectionAction(id: string, prevState: State, formData: FormData) {
  console.log("SERVER ACTION RUNNING");
  console.log("update tunnel formData", formData);

  const validatedFields = UpdateSectionSchema.safeParse({
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

  const input = mapSectionUpdate(validatedFields.data);

  try {
    await sectionRepository.update(id, input);


  } catch (error: unknown) {
    return {
      message: "更新失败",
      errors: prevState.errors,
    }
  }
  revalidatePath('/proj/sections');
  redirect('/proj/sections');
}

