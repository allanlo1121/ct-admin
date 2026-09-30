"use server";

import { z } from "zod";

import {
  CreateTunnelSchema
} from "../schemas";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { tunnelRepository } from "../repositories";
import { mapTunnelInsert } from "../mappers";

export type State = {
  errors?: {
    name?: string[];
    aliasName?: string[];
    sectionId?: string[];
    prefix?: string[];
    startChainage?: string[];
    endChainage?: string[];
    adjustment?: string[];
    sortOrder?: string[];
    isDisabled?: string[];
    remark?: string[];
  };
  message?: string | null;
};

export async function createTunnelAction(prevState: State, formData: FormData) {
  console.log("SERVER ACTION RUNNING");
  console.log("create tunnel formData", formData);

  const validatedFields = CreateTunnelSchema.safeParse({
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
    const input = mapTunnelInsert(validatedFields.data);
    const result = await tunnelRepository.insert(input);
    console.log("Tunnel created successfully", result);


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

