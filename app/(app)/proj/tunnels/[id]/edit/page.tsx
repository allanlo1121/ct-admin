import EditForm from '@/lib/domain/tunnel/ui/edit-form';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { tunnelRepository } from '@/lib/domain/tunnel/repositories';
import { sectionRepository } from '@/lib/domain/section/repositories';

import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Section',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [tunnel, sections] = await Promise.all([
    tunnelRepository.findById(id),
    sectionRepository.findRefs(),
  ]);

  if (!tunnel) {
    notFound();
  }

  return (
    <Card className="w-full mx-auto max-w-4xl">
      <CardHeader>
        <CardTitle>编辑隧道</CardTitle>

        <CardDescription>请更新隧道的相关信息</CardDescription>
      </CardHeader>

      <CardContent>
        <EditForm tunnel={tunnel} sections={sections} />
      </CardContent>
    </Card>
  );
}