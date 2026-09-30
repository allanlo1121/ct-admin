"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field"

import { createTunnelSegmentSchema } from "../../schemas"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"



type Props = {
    tunnelId: string
}

export function SegmentRowForm({ tunnelId }: Props) {
    const form = useForm<z.infer<typeof createTunnelSegmentSchema>>({
        resolver: zodResolver(createTunnelSegmentSchema),
        defaultValues: {
            name: "标准环",
            start_ring_no: 1,
            end_ring_no: 1,
            ring_width: 1,
            inner_diameter: 0,
            outer_diameter: 0,
            thickness: 0,
            remark: "",
        },
    })

    function onSubmit(tunnelId: string, data: z.infer<typeof createTunnelSegmentSchema>) {
        toast("You submitted the following values:", {
            description: (
                <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
                    <code>{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
            position: "bottom-right",
            classNames: {
                content: "flex flex-col gap-2",
            },
            style: {
                "--border-radius": "calc(var(--radius)  + 4px)",
            } as React.CSSProperties,
        })
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader className="border-b">
                <CardTitle>You&apos;re almost there!</CardTitle>
                <CardDescription>
                    Choose your subscription plan and billing period.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form id="form-rhf-complex" onSubmit={form.handleSubmit((data) => onSubmit(tunnelId, data))}>
                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-complex-name">
                                        名称
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-complex-name"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="标准环"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <FieldSeparator />
                        <Controller
                            name="start_ring_no"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-start-ring-no">
                                        起始环号
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-demo-start-ring-no"
                                        type="number"
                                        min={1}
                                        step={1}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="1"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="end_ring_no"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-end-ring-no">
                                        结束环号
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-demo-end-ring-no"
                                        type="number"
                                        min={1}
                                        step={1}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="1"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="ring_width"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-ring-width">
                                        环宽
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-demo-ring-width"
                                        type="number"
                                        min={0}
                                        step={0.1}
                                        value={field.value ?? ""}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="1"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <FieldSeparator />
                        <Controller
                            name="outer_diameter"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-outer-diameter">
                                        外径
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-demo-outer-diameter"
                                        aria-invalid={fieldState.invalid}
                                        type="number"
                                        min={0}
                                        step={0.01}
                                        value={field.value ?? ""}
                                        placeholder="1"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="inner_diameter"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-inner-diameter">
                                        内径
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-demo-inner-diameter"
                                        aria-invalid={fieldState.invalid}
                                        type="number"
                                        min={0}
                                        step={0.01}
                                        value={field.value ?? ""}
                                        placeholder="1"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="thickness"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-thickness">
                                        壁厚
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-demo-thickness"
                                        type="number"
                                        min={0}
                                        step={0.01}
                                        value={field.value ?? ""}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="1"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <FieldSeparator />
                        <Controller
                            name="remark"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field
                                    data-invalid={fieldState.invalid}
                                >
                                    <FieldLabel htmlFor="form-rhf-textarea-remark">
                                        备注
                                    </FieldLabel>
                                    <Textarea
                                        {...field}
                                        id="form-rhf-textarea-remark"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="I'm a software engineer..."
                                        className="min-h-[120px]"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter className="border-t">
                <Field>
                    <Button type="submit" form="form-rhf-complex">
                        Save Preferences
                    </Button>
                    <Button type="button" variant="outline" onClick={() => form.reset()}>
                        Reset
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    )
}
