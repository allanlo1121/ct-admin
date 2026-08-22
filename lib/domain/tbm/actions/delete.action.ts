"use server";

import { ActionResult, toActionError } from "@/lib/shared/contracts";
import { deleteTbm } from "../services";

export async function deleteTbmAction(code: string): Promise<ActionResult<void>> {
  console.log("===deleteTbm===", code);

  try {
    const result = await deleteTbm(code);

    return {
      success: true,
      message: "删除成功",
      data: result,
    };
  } catch (error) {
    console.error("Error deleting tunnel:", error);
    return toActionError(error);
  }
}
