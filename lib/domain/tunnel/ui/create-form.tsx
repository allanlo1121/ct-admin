'use client';


import Link from 'next/link';
import { Button } from '@/components/ui/button';

import { useActionState, useState } from 'react';
import { sectionTypeLabels, lineModeLabels } from "../constants";
import { SectionType } from "../types";
import { Switch } from "@/components/ui/switch";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionRef } from "../../section/types";
import { createTunnelAction, State } from "../actions";


export default function Form({ sections }: { sections: SectionRef[] }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createTunnelAction, initialState);
  const [sectionType, setSectionType] = useState<SectionType | "">("")

  return (
    <form action={formAction}>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            {/* Project Name */}
            <Field >

              <FieldLabel htmlFor="project" className="mb-2 block text-sm font-medium">
                选择隧道所属工点
              </FieldLabel>
              <Select name="sectionId">
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
              <FieldLabel htmlFor="name" className="mb-2 block text-sm font-medium">
                隧道名称
              </FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
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
              <FieldLabel htmlFor="shortName" className="mb-2 block text-sm font-medium">
                隧道别称
              </FieldLabel>
              <Input
                id="aliasName"
                name="aliasName"
                type="text"
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

          <div className="grid grid-cols-5 gap-4">
            <FieldSet>
              <Field className="col-span-1">
                <FieldLabel htmlFor="prefix" className="mb-2 block text-sm font-medium">
                  里程标记
                </FieldLabel>
                <Input
                  id="prefix"
                  name="prefix"
                  type="text"
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
              <Field className="col-span-1">
                <FieldLabel htmlFor="startChainage" className="mb-2 block text-sm font-medium">
                  起始里程
                </FieldLabel>
                <Input
                  id="startChainage"
                  name="startChainage"
                  type="number"
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

            </FieldSet>
          </div>


          {/* Section Type */}
          {/* <Field>
              <FieldLabel htmlFor="type" className="mb-2 block text-sm font-medium">
                隧道推进方向
              </FieldLabel>
              <Select
                name="type"
                value={sectionType}
                onValueChange={(value) => {
                  setSectionType(value as SectionType)
                }}
              >
                <SelectTrigger id="type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Object.entries(sectionTypeLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>

              </Select>
              <div id="type-error" aria-live="polite" aria-atomic="true">
                {state.errors?.type &&
                  state.errors.type.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </Field> */}



          {/* Line Mode */}
          {/* {sectionType === "tunnel" &&
              <Field>
                <FieldLabel htmlFor="lineMode" className="mb-2 block text-sm font-medium">
                  线路模式
                </FieldLabel>
                <Select
                  name="lineMode"
                  defaultValue="double"
                >
                  <SelectTrigger id="lineMode">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.entries(lineModeLabels).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>

                </Select>
                <div id="lineMode-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.lineMode &&
                    state.errors.lineMode.map((error: string) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </Field>} */}




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
              defaultChecked
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
          <Link
            href="/proj/sections"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            取消
          </Link>
          <Button type="submit">创建工点</Button>
        </div>
      </FieldGroup>
    </form>
  );
}