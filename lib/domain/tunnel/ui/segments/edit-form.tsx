'use client';


import Link from 'next/link';
import { Button } from '@/components/ui/button';

import { useActionState, useState } from 'react';
import { Switch } from "@/components/ui/switch";

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionRef } from "../../section/types";
import { updateTunnelAction, State } from "../actions";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/ui/input-group';
import { TunnelRow } from '../types';
import { BackButton } from '@/components/common/back-button';


export default function EditForm({ tunnel, sections }: { tunnel: TunnelRow; sections: SectionRef[] }) {
  const initialState: State = { message: null, errors: {} };
  const updateTunnelActionWithId = updateTunnelAction.bind(null, tunnel.id)
  const [state, formAction] = useActionState(updateTunnelActionWithId, initialState);
  const [startChainage, setStartChainage] = useState(tunnel.start_chainage ?? 0);
  const [endChainage, setEndChainage] = useState(tunnel.end_chainage ?? 0);
  const [adjustment, setAdjustment] = useState(tunnel.adjustment ?? 0);

  const length = Math.abs(Number(endChainage) - Number(startChainage) + Number(adjustment))




  return (
    <form action={formAction}>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            {/* Project Name */}
            <Field >

              <FieldLabel htmlFor="project" className="block text-sm font-medium">
                选择隧道所属工点
              </FieldLabel>
              <Select name="sectionId" defaultValue={tunnel.section_id}>
                <SelectTrigger id="checkout-exp-month-ts6">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {sections.map((section) => (
                      <SelectItem key={section.id} value={section.id}>
                        {section.name}
                      </SelectItem>
                    ))}

                  </SelectGroup>

                </SelectContent>
              </Select>

              <div id="section-error" aria-live="polite" aria-atomic="true">
                {state.errors?.sectionId &&
                  state.errors.sectionId.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </Field>
          </FieldGroup>
          <div className="grid grid-cols-2 gap-4">
            {/* Section Name */}
            <Field>
              <FieldLabel htmlFor="name" className="block text-sm font-medium">
                隧道名称
              </FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                defaultValue={tunnel.name}
                placeholder="输入隧道名称"
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
            {/* Section shortName */}
            <Field>
              <FieldLabel htmlFor="shortName" className="block text-sm font-medium">
                隧道别称
              </FieldLabel>
              <Input
                id="aliasName"
                name="aliasName"
                type="text"
                defaultValue={tunnel.alias_name ?? ""}
                placeholder="输入隧道别称"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="aliasName-error"
              />
              <div id="aliasName-error" aria-live="polite" aria-atomic="true">
                {state.errors?.aliasName &&
                  state.errors.aliasName.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </Field>
          </div>
          <FieldSet>
            <div className="grid grid-cols-5 gap-4">

              <Field className="col-span-1">
                <FieldLabel htmlFor="prefix" className="block text-sm font-medium">
                  里程标记
                </FieldLabel>
                <Input
                  id="prefix"
                  name="prefix"
                  type="text"
                  defaultValue={tunnel.prefix ?? ""}
                  placeholder="输入里程代码"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="prefix-error"
                />
                <div id="prefix-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.prefix &&
                    state.errors.prefix.map((error: string) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </Field>
              <Field className="col-span-2">
                <FieldLabel htmlFor="startChainage" className="block text-sm font-medium">
                  起始里程
                </FieldLabel>
                <Input
                  id="startChainage"
                  name="startChainage"
                  type="number"
                  value={Number(startChainage).toFixed(3)}
                  onChange={(e) => setStartChainage(Number(e.target.value))}
                  placeholder="输入起始里程"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="startChainage-error"
                />
                <div id="startChainage-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.startChainage &&
                    state.errors.startChainage.map((error: string) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </Field>
              <Field className="col-span-2">
                <FieldLabel htmlFor="endChainage" className="block text-sm font-medium">
                  终止里程
                </FieldLabel>
                <Input
                  id="endChainage"
                  name="endChainage"
                  type="number"
                  value={Number(endChainage).toFixed(3)}
                  onChange={(e) => setEndChainage(Number(e.target.value))}
                  placeholder="输入终止里程"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="endChainage-error"
                />
                <div id="endChainage-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.endChainage &&
                    state.errors.endChainage.map((error: string) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </Field>
              <Field className="col-span-2">
                <FieldLabel htmlFor="adjustment" className="block text-sm font-medium">
                  长链/短链
                </FieldLabel>
                <Input
                  id="adjustment"
                  name="adjustment"
                  type="number"
                  value={Number(adjustment).toFixed(3)}
                  onChange={(e) => setAdjustment(Number(e.target.value))}
                  placeholder="输入长链/短链"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="adjustment-error"
                />
                <div id="adjustment-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.adjustment &&
                    state.errors.adjustment.map((error: string) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </Field>
              <Field className="col-span-2">
                <FieldLabel>隧道长度</FieldLabel>

                <InputGroup>
                  <InputGroupInput type='number' placeholder="0.00" value={length.toFixed(3)} disabled readOnly />
                  <InputGroupAddon align="inline-end">
                    <InputGroupText>米</InputGroupText>
                  </InputGroupAddon>
                  {/* <Input className="font-medium" value={length} readOnly />
                  <span className="ml-2 text-muted-foreground">
                    m
                  </span> */}
                </InputGroup>

              </Field>

            </div>
          </FieldSet>


          {/* SortOrder */}
          <Field>
            <FieldLabel htmlFor="sortOrder">
              排序
            </FieldLabel>
            <Input
              id="sortOrder"
              name="sortOrder"
              type="number"
              step="1"
              defaultValue={tunnel.sort_order}
              placeholder="请输入排序顺序"
              aria-describedby="sortOrder-error"
            />
            {/* <FieldDescription>
                  请输入排序顺序
                </FieldDescription> */}


            <div id="sortOrder-error" aria-live="polite" aria-atomic="true">
              {state.errors?.sortOrder &&
                state.errors.sortOrder.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </Field>

          {/* IsDisabled */}
          <Field orientation="horizontal">
            <Switch
              id="isDisabled"
              defaultChecked={tunnel.is_disabled}
            />

            <FieldLabel
              htmlFor="isDisabled"
              className="font-normal"
            >
              禁用
            </FieldLabel>

            <div id="isDisabled-error" aria-live="polite" aria-atomic="true">
              {state.errors?.isDisabled &&
                state.errors.isDisabled.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </Field>
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
                  defaultValue={tunnel.remark ?? ""}
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

        </FieldSet>

        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          ) : null}
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <BackButton />
          <Button type="submit">更新隧道</Button>
        </div>
      </FieldGroup>
    </form>
  );
}