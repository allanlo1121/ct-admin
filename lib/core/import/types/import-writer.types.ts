
export type WriterResult =
  | {
    success: true;
    action: "inserted" | "updated" | "skipped";
    id: string | null;
  }
  | {
    success: false;
    error: {
      message: string;
      raw: any; // 原始数据，方便 UI 展示
    };
  };
