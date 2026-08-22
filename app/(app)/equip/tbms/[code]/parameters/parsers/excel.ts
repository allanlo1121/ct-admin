import * as XLSX from "xlsx";

import { ImportTbmParameterRow } from "./types";

export async function parseExcelFile(file: File): Promise<ImportTbmParameterRow[]> {
  const buffer = await file.arrayBuffer();

  const workbook = XLSX.read(buffer);

  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const data = XLSX.utils.sheet_to_json<Record<string, any>>(sheet);

  return data.map((row, index) => ({
    no: row["No"] ?? index + 1,
    parameterCode: row["ParameterCode"],
    parameterName: row["ParameterName"],

  }));
}
