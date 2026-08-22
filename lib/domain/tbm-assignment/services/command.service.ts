import { TbmAssignment } from "../types";
import { tbmAssignmentRepository } from "../repositories";
import { appErrors } from "@/lib/shared/contracts";
import { CreateTbmAssignmentInput, UpdateTbmAssignmentInput } from "../schemas";

export async function createTbmAssignment(input: CreateTbmAssignmentInput): Promise<TbmAssignment> {
  const existingByTbm = await tbmAssignmentRepository.findByTbmCode(input.tbmCode);

  if (existingByTbm && existingByTbm.endDate != null) {
    throw appErrors.conflict("该TBM已分配，无法重复分配");
  }
  return await tbmAssignmentRepository.insert(input);
}

export async function updateTbmAssignment(input: UpdateTbmAssignmentInput): Promise<TbmAssignment> {
  const existing = await tbmAssignmentRepository.findByTbmCode(input.tbmCode);
  if (!existing) {
    throw appErrors.notFound("TBM assignment not found for TBM ID: " + input.tbmCode);
  }
  return await tbmAssignmentRepository.update(input);
}

export async function deleteTbmAssignment(id: string): Promise<void> {
  await tbmAssignmentRepository.deleteById(id);
}
