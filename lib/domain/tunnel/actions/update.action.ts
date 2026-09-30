"use server";

import { z } from "zod";

import {
  UpdateTunnelSchema
} from "../schemas";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { tunnelRepository } from "../repositories";
import {  mapTunnelUpdate } from "../mappers";
import type { State } from "./create.action";

export async function updateTunnelAction(id: string, prevState: State, formData: FormData) {
  console.log("SERVER ACTION RUNNING");
  console.log("create tunnel formData", formData);

  const validatedFields = UpdateTunnelSchema.safeParse({
    name: formData.get("name"),
    aliasName: formData.get("aliasName"),
    sectionId: formData.get("sectionId"),
    prefix: formData.get("prefix"),
    startChainage: formData.get("startChainage"),
    endChainage: formData.get("endChainage"),
    adjustment: formData.get("adjustment"),
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

  try {
    const input = mapTunnelUpdate(validatedFields.data);
    const result = await tunnelRepository.update(id,input);
    console.log("Tunnel updated successfully", result);


  } catch (error: unknown) {
    console.error("Error creating tunnel", error);
    return {
      message: "创建隧道失败",
      errors: undefined,
    };

  }
  revalidatePath('/proj/tunnels');
  redirect('/proj/tunnels');
}

