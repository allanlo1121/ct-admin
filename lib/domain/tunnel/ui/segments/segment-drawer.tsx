"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import Form from "./create-form"

type SegmentDrawerProps = {
    tunnelId: string
}

export function SegmentDrawer({
    tunnelId,
}: SegmentDrawerProps) {
    const [open, setOpen] = useState(false)

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button size="sm">
                    <Plus className="size-4" />
                    新增环段
                </Button>
            </DrawerTrigger>

            <DrawerContent>
                <div className="mx-auto w-full max-w-3xl">
                    <DrawerHeader>
                        <DrawerTitle>新增环段</DrawerTitle>
                        <DrawerDescription>
                            配置环号范围及管片参数。
                        </DrawerDescription>
                    </DrawerHeader>

                    <div className="px-4 pb-6">
                        <Form
                            tunnel_id={tunnelId}
                        />
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}