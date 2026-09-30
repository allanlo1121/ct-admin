"use client";

import { useMemo } from "react";
import { Search } from "@/components/common/search-input";

import { sectionQuery } from "@/lib/domain/section/queries";
import { useSearchParams } from "next/navigation";


export function SectionListToolbar() {


  const searchParams = useSearchParams();

  // 🔥 解析当前 query（关键）
  const query = useMemo(
    () => sectionQuery.parse(Object.fromEntries(searchParams.entries())),
    [searchParams]
  );

  return (
    <div className="flex items-center justify-between w-full">
      <Search placeholder="搜索工点..." />
    </div>
  );
}
