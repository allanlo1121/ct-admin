'use client';


import Link from 'next/link';
import { Button } from '@/components/ui/button';

import { useActionState } from 'react';


import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { createSegmentAction, SegmentState as State } from "../../actions";


export default function Form({ tunnel_id }: { tunnel_id: string }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction, pending] = useActionState(createSegmentAction, initialState);




  return (
    <form action={formAction}>
      <FieldGroup>
        <FieldSet>

          {/* Tunnel Id */}
          <Field>
            <input
              type="hidden"
              name="tunnel_id"
              value={tunnel_id}
            />
          </Field>

          {/* Segment Name */}
          <Field>
            <FieldLabel htmlFor="name" className="block text-sm font-medium">
              环段名称
            </FieldLabel>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="输入环段名称"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="name-error"
            />
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.name &&
                state.errors.name.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </Field>


          <div className="w-full grid grid-cols-3 gap-4">
            {/* Segment start_ring_no */}
            <Field >
              <FieldLabel htmlFor="start_ring_no" className="block text-sm font-medium">
                起始环号
              </FieldLabel>
              <Input
                id="start_ring_no"
                name="start_ring_no"
                type="number"
                placeholder="输入起始环号"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="start_ring_no-error"
              />
              <div id="start_ring_no-error" aria-live="polite" aria-atomic="true">
                {state.errors?.start_ring_no &&
                  state.errors.start_ring_no.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </Field>
            {/* Segment end_ring_no */}
            <Field>
              <FieldLabel htmlFor="end_ring_no" className="block text-sm font-medium">
                结束环号
              </FieldLabel>
              <Input
                id="end_ring_no"
                name="end_ring_no"
                type="number"
                placeholder="输入结束环号"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="end_ring_no-error"
              />
              <div id="end_ring_no-error" aria-live="polite" aria-atomic="true">
                {state.errors?.end_ring_no &&
                  state.errors.end_ring_no.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </Field>
            {/* Segment ring_width */}
            <Field>
              <FieldLabel htmlFor="ring_width" className="block text-sm font-medium">
                管片宽度
              </FieldLabel>
              <Input
                id="ring_width"
                name="ring_width"
                type="number"
                placeholder="输入管片宽度"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="ring_width-error"
              />
              <div id="ring_width-error" aria-live="polite" aria-atomic="true">
                {state.errors?.ring_width &&
                  state.errors.ring_width.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </Field>
            {/* Segment outer_diameter */}
            <Field >
              <FieldLabel htmlFor="outer_diameter" className="block text-sm font-medium">
                管片外径
              </FieldLabel>
              <Input
                id="outer_diameter"
                name="outer_diameter"
                type="number"
                placeholder="输入管片外径"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="outer_diameter-error"
              />
              <div id="outer_diameter-error" aria-live="polite" aria-atomic="true">
                {state.errors?.outer_diameter &&
                  state.errors.outer_diameter.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </Field>
            {/* Segment inner_diameter */}
            <Field>
              <FieldLabel htmlFor="inner_diameter" className="block text-sm font-medium">
                管片内径
              </FieldLabel>
              <Input
                id="inner_diameter"
                name="inner_diameter"
                type="number"
                placeholder="输入管片内径"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="inner_diameter-error"
              />
              <div id="inner_diameter-error" aria-live="polite" aria-atomic="true">
                {state.errors?.inner_diameter &&
                  state.errors.inner_diameter.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </Field>
            {/* Segment thickness */}
            <Field>
              <FieldLabel htmlFor="thickness" className="block text-sm font-medium">
                管片厚度
              </FieldLabel>
              <Input
                id="thickness"
                name="thickness"
                type="number"
                placeholder="输入管片厚度"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="thickness-error"
              />
              <div id="thickness-error" aria-live="polite" aria-atomic="true">
                {state.errors?.thickness &&
                  state.errors.thickness.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </Field>
          </div>
        </FieldSet>

        {/* remark */}
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="remark">
                备注
              </FieldLabel>
              <Textarea
                id="remark"
                name="remark"
                placeholder="请输入备注"
                className="resize-none"
              />
            </Field>


            <div id="remark-error" aria-live="polite" aria-atomic="true">
              {state.errors?.remark &&
                state.errors.remark.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </FieldGroup>

        </FieldSet>



        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          ) : null}
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/proj/sections"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            取消
          </Link>
          <Button
            type="submit"
            disabled={pending}
          >
            {pending ? "保存中..." : "添加环段"}
          </Button>
        </div>
      </FieldGroup>
    </form >
  );
}