"use server";

import { revalidatePath } from 'next/cache';
import { segmentRepository, tunnelRepository } from "../repositories";

export async function deleteTunnelAction(id: string): Promise<void> {
  console.log("===deleteTunnel===", id);

  await tunnelRepository.deleteById(id);

  revalidatePath('/proj/tunnels');
}



export async function deleteTunnelSegmentAction(id: string): Promise<void> {
  console.log("===deleteTunnelSegment===", id);

  await segmentRepository.deleteById(id);

  revalidatePath('/proj/tunnels');
}
