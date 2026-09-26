"use server";


import { sectionRepository } from "../repositories";
import { revalidatePath } from 'next/cache';


export async function deleteSectionAction(id: string): Promise<void> {
  console.log("===deleteSection===", id);


  await sectionRepository.deleteById(id);

  revalidatePath('/proj/sections');

}
