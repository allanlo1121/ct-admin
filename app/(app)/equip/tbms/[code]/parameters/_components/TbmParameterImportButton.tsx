"use client";

import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { importTbmParameterConfigsAction } from "@/lib/domain/tbm-config/actions";
import { parseImportFile } from "../parsers/parseImportFile";

import { tbmParameterInsertMany } from "@/lib/domain/tbm-config/repositories/client";


export function TbmParameterImportButton({ tbmCode }: { tbmCode: string }) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const result = await parseImportFile(file);

    const data = result.map((row) => ({
      tbm_code: tbmCode,
      parameter_code: row.parameterCode,

    }));

    console.log("ImportTbmParameterConfigInput", result);

    await tbmParameterInsertMany(data);
  }

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
        导入
      </Button>

      <Input
        ref={inputRef}
        type="file"
        accept=".xlsx,.xls,.csv"
        className="hidden"
        onChange={handleFileChange}
      />
    </>
  );
}
