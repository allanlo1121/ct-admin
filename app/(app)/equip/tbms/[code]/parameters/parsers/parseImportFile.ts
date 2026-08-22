import { parseExcelFile } from "./excel";

import { ImportTbmParameterRow } from "./types";

export async function parseImportFile(file: File): Promise<ImportTbmParameterRow[]> {
  const ext = file.name.split(".").pop()?.toLowerCase();

  switch (ext) {
    case "xlsx":
    case "xls":
      return parseExcelFile(file);

    // case "csv":
    //   return parseCsvFile(file);

    // case "xml":
    //   return parseXmlFile(file);

    default:
      throw new Error("不支持的文件格式");
  }
}
