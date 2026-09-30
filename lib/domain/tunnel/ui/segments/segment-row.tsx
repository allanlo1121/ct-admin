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
import { TableCell, TableRow } from "@/components/ui/table"
import { TunnelSegmentRow } from "../../types"



type Props = {
    segment: TunnelSegmentRow
}

export function SegmentRow({ segment }: Props) {



    return (
                    <TableRow>
                        <TableCell>
                           {segment.start_ring_no}
                        </TableCell>
                        <TableCell>
                            {segment.end_ring_no}
                        </TableCell>
                        <TableCell>
                            {segment.ring_width}
                        </TableCell>
                        <TableCell>
                            {segment.inner_diameter}
                        </TableCell>

                        <TableCell>

                            {segment.outer_diameter}
                        </TableCell>
                        <TableCell>
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
                        </TableCell>
                        <TableCell>
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

                        </TableCell>
                        <TableCell>
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
                        </TableCell>
                    </TableRow>
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
