"use server";

import { z } from "zod";

import {
    CreateTunnelSegmentSchema
} from "../schemas";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { segmentRepository, } from "../repositories";
import { routes } from "@/lib/core/routes/routes";

export type SegmentState = {
    errors?: {
        tunnel_id?: string[];
        name?: string[];
        start_ring_no?: string[];
        end_ring_no?: string[];
        ring_width?: string[];
        inner_diameter?: string[];
        outer_diameter?: string[];
        thickness?: string[];
        remark?: string[];
    };
    message?: string | null;
};

export async function createSegmentAction(prevState: SegmentState, formData: FormData) {
    console.log("SERVER ACTION RUNNING");
    console.log("create tunnel formData", formData);

    const validatedFields = CreateTunnelSegmentSchema.safeParse({
        tunnel_id: formData.get("tunnel_id"),
        name: formData.get("name"),
        start_ring_no: formData.get("start_ring_no"),
        end_ring_no: formData.get("end_ring_no"),
        ring_width: formData.get("ring_width"),
        inner_diameter: formData.get("inner_diameter"),
        outer_diameter: formData.get("outer_diameter"),
        thickness: formData.get("thickness"),
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
        const input = validatedFields.data;
        const result = await segmentRepository.insert(input);
        console.log("Tunnel segment created successfully", result);


    } catch (error: unknown) {
        console.error("Error creating tunnel segment", error);
        return {
            message: "创建隧道段失败",
            errors: undefined,
        };

    }
    revalidatePath(routes.tunnels.segments(validatedFields.data.tunnel_id));
    return {
        message: "添加成功",
    };
}

