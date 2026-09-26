"use server";

import { z } from "zod";
import {
  createTunnelFull,

} from "../services";
import {
  CreateTunnelSchema
} from "../schemas";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type State = {
  errors?: {
    name?: string[];
    aliasName?: string[];
    sectionId?: string[];
    prefix?: string[];
    startChainage?: string[];
    endChainage?: string[];
    advanceDirection?: string[];
    startRing?: string[];
    endRing?: string[];
    actualStartDate?: string[];
    actualEndDate?: string[];
    geology?: string[];
    latitude?: string[];
    longitude?: string[];
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
    advanceDirection: formData.get("advanceDirection"),
    startRing: formData.get("startRing"),
    endRing: formData.get("endRing"),
    actualStartDate: formData.get("actualStartDate"),
    actualEndDate: formData.get("actualEndDate"),
    geology: formData.get("geology"),
    latitude: formData.get("latitude"),
    longitude: formData.get("longitude"),
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
    const result = await createTunnelFull(validatedFields.data);


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

