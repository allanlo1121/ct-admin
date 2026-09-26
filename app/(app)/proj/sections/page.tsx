

import { Suspense } from 'react';
import { CreateSection } from '@/lib/domain/section/ui/buttons';
import { SectionsTableSkeleton } from '@/lib/domain/section/ui/skeleton';

import { Metadata } from 'next';
import { sectionQuery } from '@/lib/domain/section/queries';
import { sectionRepository } from '@/lib/domain/section/repositories/repository';
import { SectionListToolbar } from '@/lib/domain/section/ui/list-toolbar';
import { SectionTableClient } from '@/lib/domain/section/ui/table-client';

export const metadata: Metadata = {
  title: 'Sections',
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
   const rawParams = await searchParams;

    const raw = sectionQuery.parse(rawParams);
  
    const params = {
      ...raw,
      sortBy: raw.sortBy ?? "sortOrder",
    };

    const result = await sectionRepository.paginate(params);
  
  const { items, total, page, pageSize } = result;
  const { sortBy, sortDirection } = params;


  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">工点</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <SectionListToolbar />
        <CreateSection />
      </div>
      <Suspense key={(params.search?? "") + params.page} fallback={<SectionsTableSkeleton />}>
         <SectionTableClient
                  items={items}
                  total={total}
                  page={page}
                  pageSize={pageSize}
                  sortBy={sortBy}
                  sortDirection={sortDirection}
                />
      </Suspense>
    
    </div>
  );
}